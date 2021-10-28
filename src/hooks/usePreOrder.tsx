import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import { useReducer, useState } from "react"

import env from "@/.env.json"
import { Lang, PRE_ORDER_MIN_QUANTITY, WalletErrorType } from "~/enums"
import { getWalletErrorMessage } from "~/utils"

type UsePreOrderProps = {
  onPreOrderConfirm?: (txReceipt: ethers.providers.TransactionReceipt) => void
}

type ReducerState = {
  qtySelected: ethers.BigNumber // qty to be pre-order
  qtyOrdered: ethers.BigNumber // qty ordered by current account
  qtyLimited: ethers.BigNumber // max qty that current account can be ordered
  qtyAvailable: ethers.BigNumber // total supply - total ordered
  preOrdered: boolean // is currenct account pre-ordered
  inPreOrder: boolean // is pre-order started
  unitPrice?: ethers.BigNumber
  gasLimit?: ethers.BigNumber
  gasPrice?: ethers.BigNumber
}

type ReducerDispatchActionType = "update"

export const usePreOrder = ({ onPreOrderConfirm }: UsePreOrderProps) => {
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const initialState: ReducerState = {
    qtySelected: ethers.BigNumber.from(PRE_ORDER_MIN_QUANTITY),
    qtyOrdered: ethers.BigNumber.from(0),
    qtyLimited: ethers.BigNumber.from(PRE_ORDER_MIN_QUANTITY),
    qtyAvailable: ethers.BigNumber.from(0),
    preOrdered: false,
    gasLimit: undefined,
    gasPrice: undefined,
    inPreOrder: false,
    unitPrice: undefined,
  }
  const reducer = (
    state: ReducerState,
    action: { type: ReducerDispatchActionType; payload: Partial<ReducerState> }
  ) => {
    if (env.env === "development") {
      console.log(action)
    }
    switch (action.type) {
      case "update":
        return { ...state, ...action.payload }
      default:
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  /**
   * Pre Order
   */
  const setQtySelected = (qtySelected: ethers.BigNumber) => {
    dispatch({
      type: "update",
      payload: { ...state, qtySelected },
    })
  }

  // retrieve pre-order info
  const getPreOrderDetail = async () => {
    if (!account) {
      return
    }

    setLoading(true)
    setError("")

    try {
      const [
        preOrderLimit,
        preOrderSupply,
        inPreOrder,
        preOrderMinAmount,
        preOrderMintIndex,
        accountPreOrder,
      ] = await Promise.all([
        contract.preOrderLimit(),
        contract.preOrderSupply(),
        contract.inPreOrder(),
        contract.preOrderMinAmount(),
        contract.preOrderMintIndex(),
        contract.preOrderGet(account),
      ])

      const payload = {
        qtyLimited: preOrderLimit,
        inPreOrder,
        unitPrice: preOrderMinAmount,
        qtyOrdered: accountPreOrder.n,
        qtyAvailable: preOrderSupply.sub(preOrderMintIndex),
      } as ReducerState
      dispatch({ type: "update", payload })

      setLoading(false)

      return payload
    } catch (err) {
      console.error(err)
      setError(getWalletErrorMessage({ error: err as Error, lang }))
    }

    setLoading(false)
  }

  // check if pre-order is available
  const canPreOrder = async (estimateGas: boolean) => {
    if (!library || !account) {
      return false
    }

    const detail = await getPreOrderDetail()

    if (!detail) {
      return false
    }

    const { inPreOrder, unitPrice, qtyAvailable, qtyOrdered, qtyLimited } =
      detail

    // not started
    if (!inPreOrder) {
      setError(
        getWalletErrorMessage({
          type: WalletErrorType.preOrderNotStarted,
          lang,
        })
      )
      return false
    }

    // unit price is invalid
    if (!unitPrice || unitPrice.lte(0)) {
      setError(
        getWalletErrorMessage({
          type: WalletErrorType.preOrderInvalidUnitPrice,
          lang,
        })
      )
      return false
    }

    // out of supply
    if (qtyAvailable.lt(state.qtySelected)) {
      setError(
        getWalletErrorMessage({
          type: WalletErrorType.preOrderReachLimit,
          lang,
        })
      )
      return false
    }

    // reach order limit
    if (qtyOrdered.add(state.qtySelected).gt(qtyLimited)) {
      setError(
        getWalletErrorMessage({
          type: WalletErrorType.preOrderReachLimit,
          lang,
        })
      )
      return false
    }

    // estimate gas
    if (!estimateGas) {
      return true
    }
    try {
      const [gasUsed, gasPrice] = await Promise.all([
        contract
          .connect(library.getSigner())
          .estimateGas.preOrder(ethers.BigNumber.from(state.qtySelected), {
            value: unitPrice.mul(state.qtySelected),
          }),
        library.getGasPrice(),
      ])

      // add buffer
      const maxGasUsed = gasUsed.mul(3).div(2)

      // update estimate gas cost
      dispatch({ type: "update", payload: { gasLimit: maxGasUsed, gasPrice } })
    } catch (err) {
      console.error(err)
      setError(
        getWalletErrorMessage({
          type: WalletErrorType.failedToEstimateGas,
          lang,
        })
      )
      return false
    }

    return true
  }

  // send pre-order transaction
  const preOrder = async () => {
    if (!library || !state.unitPrice) {
      return
    }

    if (!(await canPreOrder(false))) {
      return
    }

    setLoading(true)
    setError("")

    try {
      // send transaction and wait for confirmation
      const tx = await contract
        .connect(library.getSigner())
        .preOrder(ethers.BigNumber.from(state.qtySelected), {
          value: state.unitPrice.mul(state.qtySelected),
          gasLimit: state.gasLimit,
        })
      const receipt = await tx.wait()

      if (onPreOrderConfirm) {
        onPreOrderConfirm(receipt)
      }
    } catch (err) {
      console.error(err)
      setError(
        getWalletErrorMessage({ type: WalletErrorType.failedToSendTx, lang })
      )
    }

    setLoading(false)
  }

  return {
    contract,

    loading,
    error,
    ...state,

    setQtySelected,
    preOrder,
    canPreOrder,
    getPreOrderDetail,
  }
}
