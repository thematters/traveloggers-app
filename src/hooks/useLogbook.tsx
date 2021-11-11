import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import { useReducer } from "react"

import env from "@/.env.json"
import { Lang, WalletErrorType } from "~/enums"
import {
  EtherscanObject,
  getWalletErrorMessage,
  retrieveOwnerNFTs,
  toEtherscanUrl,
  toOpenSeaNFTUrl,
} from "~/utils"

type Log = {
  sender: string // address
  message: string
  createdAt: Date
  etherscan: EtherscanObject
}

// local state for append a new log
type LogDraft = {
  sending: boolean
  error?: string

  message: string

  // estimate gas
  gasPrice?: ethers.BigNumber
  gasLimit?: ethers.BigNumber
  gasCost?: ethers.BigNumber
}

type Logbook = {
  loading: boolean
  error?: string

  tokenId: string
  tokenOwner?: string // address

  isLocked: boolean
  logs: Log[]

  openSeaURL: string
  draft?: LogDraft
}

type OwnLogbooks = {
  loading: boolean
  error?: string

  logbooks: Logbook[] // order by token id, asc
}

type ReducerState = {
  logbooks: { [tokenId: string]: Logbook }
  ownLogbooks: OwnLogbooks
}

type ReducerAction =
  | {
      type: "update"
      payload: Partial<ReducerState>
    }
  | {
      type: "updateLogbook"
      payload: { tokenId: string; logbook: Partial<Logbook> }
    }
  | {
      type: "updateDraft"
      payload: { tokenId: string; draft: LogDraft }
    }

export const useLogbook = () => {
  const { locale } = useLocalization()
  const lang = locale as Lang

  const { account, library } = useWeb3React<ethers.providers.Web3Provider>()
  const contract = new ethers.Contract(
    env.contractAddress,
    env.contractABI,
    library
  )

  /**
   * States
   */
  const initialState: ReducerState = {
    logbooks: {},
    ownLogbooks: { loading: false, logbooks: [] },
  }
  const reducer = (state: ReducerState, action: ReducerAction) => {
    if (env.env === "development") {
      console.log(action)
    }
    switch (action.type) {
      case "update":
        return {
          logbooks: {
            ...state.logbooks,
            ...action.payload.logbooks,
          },
          ownLogbooks: {
            ...state.ownLogbooks,
            ...action.payload.ownLogbooks,
          },
        }
      case "updateLogbook":
        return {
          ...state,
          logbooks: {
            ...state.logbooks,
            [action.payload.tokenId]: {
              ...state.logbooks[action.payload.tokenId],
              ...action.payload.logbook,
            },
          },
        }
      case "updateDraft":
        return {
          ...state,
          logbooks: {
            ...state.logbooks,
            [action.payload.tokenId]: {
              ...state.logbooks[action.payload.tokenId],
              draft: {
                ...state.logbooks[action.payload.tokenId]?.draft,
                ...action.payload.draft,
              },
            },
          },
        }
      default:
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  /**
   * Get lobook
   */
  const normalizedLogs = (logs: any[]): Log[] =>
    logs.map(log => ({
      sender: log.sender,
      message: log.message,
      createdAt: new Date(log.createdAt),
      etherscan: toEtherscanUrl(""), // TODO: get tx hash via filtering events
    }))

  // retrieve single logbook by a given tokenId
  const getLogbook = async (tokenId: string) => {
    // mark as loading
    dispatch({
      type: "updateLogbook",
      payload: {
        tokenId,
        logbook: {
          ...state.logbooks[tokenId],
          loading: true,
          error: "",
          tokenId,
        },
      },
    })

    try {
      // retrieve lobook and token owner from contract
      const logbook = await contract.readLogbook(tokenId)
      const tokenOwner = await contract.ownerOf(tokenId)

      dispatch({
        type: "updateLogbook",
        payload: {
          tokenId,
          logbook: {
            loading: false,
            error: "",

            tokenId,
            tokenOwner,

            isLocked: logbook.isLocked,
            logs: normalizedLogs(logbook.logs),

            openSeaURL: toOpenSeaNFTUrl(tokenId),
          },
        },
      })
    } catch (err) {
      console.error(err)
      const errorMsg = getWalletErrorMessage({ error: err as Error, lang })

      dispatch({
        type: "updateLogbook",
        payload: {
          tokenId,
          logbook: {
            ...state.logbooks[tokenId],
            loading: false,
            error: errorMsg,
            tokenId,
          },
        },
      })
    }
  }

  // retrieve all logbooks own by current account
  const getOwnLogbooks = async () => {
    if (!account) {
      return
    }

    // mark as loading
    dispatch({
      type: "update",
      payload: {
        ownLogbooks: {
          ...state.ownLogbooks,
          loading: true,
          error: "",
        },
      },
    })

    try {
      // retrieve token ids from OpenSea
      const tokens = await retrieveOwnerNFTs({ owner: account })

      // retrieve logbooks from contract
      const logbooks = await Promise.all(
        tokens.map(async ({ token_id }) => contract.readLogbook(token_id))
      )

      const logbooksMap: { [tokenId: string]: Logbook } = {}
      logbooks.forEach((logbook, index) => {
        const tokenId = tokens[index].token_id

        logbooksMap[tokenId] = {
          loading: false,
          error: "",

          tokenId,
          tokenOwner: account,

          isLocked: logbook.isLocked,
          logs: normalizedLogs(logbook.logs),

          openSeaURL: toOpenSeaNFTUrl(tokenId),
        }
      })

      // update logbooks and ownLogbooks
      dispatch({
        type: "update",
        payload: {
          logbooks: {
            ...state.logbooks,
            ...logbooksMap,
          },
          ownLogbooks: {
            loading: false,
            error: "",
            logbooks: tokens.map(({ token_id }) => logbooksMap[token_id]),
          },
        },
      })
    } catch (err) {
      console.error(err)
      const errorMsg = getWalletErrorMessage({ error: err as Error, lang })

      dispatch({
        type: "update",
        payload: {
          ownLogbooks: {
            ...state.ownLogbooks,
            loading: false,
            error: errorMsg,
          },
        },
      })
    }
  }

  /**
   * Write logbook
   */
  // update log draft
  const updateDraft = async (tokenId: string, message: string) => {
    if (!library || !account) {
      return
    }

    try {
      const [gasUsed, gasPrice] = await Promise.all([
        contract
          .connect(library.getSigner())
          .estimateGas.appendLog(tokenId, message),
        library.getGasPrice(),
      ])

      // add buffer
      const maxGasUsed = gasUsed.mul(3).div(2) // +33%

      dispatch({
        type: "updateDraft",
        payload: {
          tokenId,
          draft: {
            sending: false,
            error: "",

            message,

            gasPrice,
            gasLimit: maxGasUsed,
            gasCost: gasPrice.mul(maxGasUsed),
          },
        },
      })
    } catch (err) {
      console.error(err)
      const errorMsg = getWalletErrorMessage({
        type: WalletErrorType.failedToEstimateGas,
        lang,
      })

      dispatch({
        type: "updateDraft",
        payload: {
          tokenId,
          draft: {
            sending: false,
            error: errorMsg,
            message,
          },
        },
      })
    }
  }

  // append a log to a logbook by a given tokenId
  const appendLog = async (tokenId: string, message: string) => {
    if (!library || !account) {
      return
    }

    const logbook = state.logbooks[tokenId]

    if (logbook.tokenOwner !== account) {
      // TODO: error
    }

    const gasLimit = logbook?.draft?.gasLimit
    if (!gasLimit || logbook?.draft?.sending) {
      return
    }

    dispatch({
      type: "updateDraft",
      payload: {
        tokenId,
        draft: {
          message,
          sending: true,
          error: "",
        },
      },
    })

    try {
      await contract.connect(library.getSigner()).appendLog(tokenId, message, {
        gasLimit,
      })

      dispatch({
        type: "updateDraft",
        payload: {
          tokenId,
          draft: {
            sending: false,
            error: "",
            message,
          },
        },
      })

      // refetch logbook
      await getLogbook(tokenId)
    } catch (err) {
      console.error(err)
      const errorMsg = getWalletErrorMessage({ error: err as Error, lang })

      dispatch({
        type: "updateDraft",
        payload: {
          tokenId,
          draft: {
            sending: false,
            error: errorMsg,
            message,
          },
        },
      })
    }
  }

  return {
    getLogbook,
    logbooks: state.logbooks,

    getOwnLogbooks,
    ownLogbooks: state.ownLogbooks,

    updateDraft,
    appendLog,
  }
}
