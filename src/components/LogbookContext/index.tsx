import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import React from "react"
import { createContext, useReducer, useRef } from "react"

import env from "@/.env.json"
import { Lang, WalletErrorType } from "~/enums"
import {
  EtherscanObject,
  getWalletErrorMessage,
  retrieveNFT,
  retrieveOwnerNFTs,
  toEtherscanUrl,
} from "~/utils"

export type Log = {
  sender: string // address
  message: string
  createdAt: Date
  etherscan: EtherscanObject
}

// local state for append a new log
export type LogDraft = {
  sending: boolean
  error?: string

  message: string
  txHash?: string

  // estimate gas
  gasPrice?: ethers.BigNumber
  gasLimit?: ethers.BigNumber
  gasCost?: ethers.BigNumber
}

export type Logbook = {
  loading: boolean
  error?: string

  tokenId: string
  tokenOwner?: string // address
  tokenOpenSeaURL: string
  tokenImageURL: string

  isLocked: boolean
  logs: Log[]

  draft?: LogDraft
}

export type OwnNFTs = {
  loading: boolean
  error?: string
  tokenIds: string[]
}

type ReducerState = {
  logbooks: { [tokenId: string]: Logbook | undefined }
  ownNFTs: OwnNFTs
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

type Context = {
  getLogbook: (tokenId: string) => Promise<void>
  logbooks: { [tokenId: string]: Logbook | undefined }

  getOwnNFTs: () => Promise<void>
  ownNFTs: OwnNFTs

  updateDraft: (tokenId: string, message: string) => Promise<void>
  appendLog: (tokenId: string, message: string) => Promise<void>
}

export const LogbookContext = createContext({} as Context)

export const LogbookProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { locale } = useLocalization()
  const lang = locale as Lang

  const { account, library } = useWeb3React<ethers.providers.Web3Provider>()

  /**
   * States
   */
  const initialState: ReducerState = {
    logbooks: {},
    ownNFTs: { loading: false, tokenIds: [] },
  }
  const stateRef = useRef(initialState)

  const reducer = (state: ReducerState, action: ReducerAction) => {
    if (env.env === "development") {
      console.log(action)
    }

    let newState = state

    switch (action.type) {
      case "update":
        newState = {
          logbooks: {
            ...state.logbooks,
            ...action.payload.logbooks,
          },
          ownNFTs: {
            ...state.ownNFTs,
            ...action.payload.ownNFTs,
          },
        }
        break
      case "updateLogbook":
        newState = {
          ...state,
          logbooks: {
            ...state.logbooks,
            [action.payload.tokenId]: {
              ...(state.logbooks[action.payload.tokenId] as Logbook),
              ...(action.payload.logbook as Logbook),
            },
          },
        }
        break

      case "updateDraft":
        console.log(
          { prev: state.logbooks[action.payload.tokenId] },
          state.logbooks
        )
        newState = {
          ...state,
          logbooks: {
            ...state.logbooks,
            [action.payload.tokenId]: {
              ...(state.logbooks[action.payload.tokenId] as Logbook),
              draft: {
                ...state.logbooks[action.payload.tokenId]?.draft,
                ...action.payload.draft,
              },
            },
          },
        }
        break
      default:
        throw new Error()
    }

    stateRef.current = newState
    return newState
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  /**
   * Get logbook
   */
  const normalizedLogs = (logs: any[]): Log[] =>
    logs.map(log => ({
      sender: log.sender,
      message: log.message,
      createdAt: new Date(
        (log.createdAt as ethers.BigNumber).toNumber() * 1000
      ),
      etherscan: toEtherscanUrl(""), // TODO: get tx hash from event
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
      const contract = new ethers.Contract(
        env.contractAddress,
        env.contractABI,
        // ethers.getDefaultProvider(env.supportedChainId, { infura: env.infuraId })
        new ethers.providers.InfuraProvider(env.supportedChainId, env.infuraId)
      )

      // retrieve lobook and token owner from contract
      const [logbook, token] = await Promise.all([
        contract.readLogbook(tokenId),
        retrieveNFT({ tokenId }),
      ])

      dispatch({
        type: "updateLogbook",
        payload: {
          tokenId,
          logbook: {
            loading: false,
            error: "",

            tokenId,
            tokenOwner: ethers.utils.getAddress(token.owner.address),
            tokenImageURL: token.image_preview_url,
            tokenOpenSeaURL: token.permalink,

            isLocked: logbook.isLocked,
            logs: normalizedLogs(logbook.logs),
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
  const getOwnNFTs = async () => {
    if (!account) {
      return
    }

    try {
      const contract = new ethers.Contract(
        env.contractAddress,
        env.contractABI,
        // ethers.getDefaultProvider(env.supportedChainId, { infura: env.infuraId })
        new ethers.providers.InfuraProvider(env.supportedChainId, env.infuraId)
      )

      const numTokens = await contract.balanceOf(account)
      console.log(`got ${numTokens} tokens for address ${account}`, {
        numTokens,
        account,
      })
      if (!(numTokens.toNumber() > 0)) {
        return
      }

      // mark as loading
      dispatch({
        type: "update",
        payload: {
          ownNFTs: { ...state.ownNFTs, loading: true, error: "" },
        },
      })

      // retrieve token ids from OpenSea
      const tokens = await retrieveOwnerNFTs({ owner: account })
      console.log(`got tokens from opensea for address ${account}`, {
        account,
        tokens,
      })

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
          tokenImageURL: tokens[index].image_preview_url,
          tokenOpenSeaURL: tokens[index].permalink,

          isLocked: logbook.isLocked,
          logs: normalizedLogs(logbook.logs),
        }
      })

      // update logbooks and ownNFTs
      dispatch({
        type: "update",
        payload: {
          logbooks: {
            ...state.logbooks,
            ...logbooksMap,
          },
          ownNFTs: {
            loading: false,
            error: "",
            tokenIds: tokens.map(({ token_id }) => token_id),
          },
        },
      })
    } catch (err) {
      console.error(err)
      const errorMsg = getWalletErrorMessage({ error: err as Error, lang })

      dispatch({
        type: "update",
        payload: {
          ownNFTs: {
            ...state.ownNFTs,
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
      const contract = new ethers.Contract(
        env.contractAddress,
        env.contractABI,
        library
      )
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
          draft: { sending: false, error: errorMsg, message },
        },
      })
    }
  }

  // append a log to a logbook by a given tokenId
  const appendLog = async (tokenId: string, message: string) => {
    if (!library || !account) {
      return
    }

    dispatch({
      type: "updateDraft",
      payload: { tokenId, draft: { message, sending: true, error: "" } },
    })

    let logbook = stateRef.current.logbooks[tokenId]
    if (!logbook || !logbook.tokenOwner) {
      await getOwnNFTs()
      logbook = stateRef.current.logbooks[tokenId]
    }

    // if logbook is not exists or account is not the owner
    if (logbook?.tokenOwner !== account) {
      const errorMsg = getWalletErrorMessage({
        type: WalletErrorType.logbookNotOwner,
        lang,
      })
      dispatch({
        type: "updateDraft",
        payload: {
          tokenId,
          draft: { sending: false, error: errorMsg, message },
        },
      })
      return
    }

    // if logbook is locked
    if (logbook.isLocked) {
      const errorMsg = getWalletErrorMessage({
        type: WalletErrorType.logbookLocked,
        lang,
      })
      dispatch({
        type: "updateDraft",
        payload: {
          tokenId,
          draft: { sending: false, error: errorMsg, message },
        },
      })
      return
    }

    if (logbook.draft?.sending) {
      return
    }

    // if gasLimit is not exist
    let gasLimit = logbook?.draft?.gasLimit
    if (!gasLimit) {
      await updateDraft(tokenId, message)
      gasLimit = stateRef.current.logbooks[tokenId]?.draft?.gasLimit
    }

    try {
      const contract = new ethers.Contract(
        env.contractAddress,
        env.contractABI,
        library
      )

      const tx = await contract
        .connect(library.getSigner())
        .appendLog(tokenId, message, { gasLimit })

      dispatch({
        type: "updateDraft",
        payload: {
          tokenId,
          draft: { sending: false, error: "", message, txHash: tx.hash },
        },
      })

      await tx.wait()

      // refetch logbook
      await getLogbook(tokenId)
    } catch (err) {
      console.error(err)
      const errorMsg = getWalletErrorMessage({ error: err as Error, lang })

      dispatch({
        type: "updateDraft",
        payload: {
          tokenId,
          draft: { sending: false, error: errorMsg, message },
        },
      })
    }
  }

  return (
    <LogbookContext.Provider
      value={{
        getLogbook,
        logbooks: state.logbooks,

        getOwnNFTs,
        ownNFTs: state.ownNFTs,

        updateDraft,
        appendLog,
      }}
    >
      {children}
    </LogbookContext.Provider>
  )
}
