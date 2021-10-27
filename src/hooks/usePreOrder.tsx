import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import { useEffect, useState } from "react"

import env from "@/.env.json"
import { Lang, PRE_ORDER_MIN_QUANTITY, WalletErrorType } from "~/enums"
import { getWalletErrorMessage } from "~/utils"

type UsePreOrderProps = {
  fetchOnMount?: boolean
  onPreOrderConfirm?: (txReceipt: ethers.providers.TransactionReceipt) => void
}

export const usePreOrder = ({
  fetchOnMount = true,
  onPreOrderConfirm,
}: UsePreOrderProps) => {
  const { locale } = useLocalization()
  const lang = locale as Lang

  const { account, library } = useWeb3React<ethers.providers.Web3Provider>()

  const [contract, setContract] = useState(
    new ethers.Contract(env.contractAddress, env.contractABI, library)
  )

  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const [quantity, setQuantity] = useState(PRE_ORDER_MIN_QUANTITY)
  const [preOrdered, setPreOrdered] = useState(false)

  const [gasLimit, setGasLimit] = useState<ethers.BigNumber>()
  const [gasPrice, setGasPrice] = useState<ethers.BigNumber>()
  const [inPreOrder, setInPreOrder] = useState(true)
  const [unitPrice, setUnitPrice] = useState<ethers.BigNumber>()
  // const [availableQty, setAvailableQty] = useState<ethers.BigNumber>()

  /**
   * Contract
   */
  const connectContractToSigner = async () => {
    if (!library) {
      return
    }
    const signer = library.getSigner()
    setContract(contract.connect(signer))
  }
  const getContractInfo = async () => {
    if (!library) {
      return
    }

    try {
      // is in PreOrder
      setInPreOrder(await contract.inPreOrder())

      // uni price
      const preOrderUnitPrice =
        (await contract.preOrderMinAmount()) as ethers.BigNumber
      setUnitPrice(preOrderUnitPrice)

      // TODO: pre-ordered quantity in current account

      // TODO: available pre-orderable quantity

      // TODO: if account already pre-ordered
    } catch (err) {
      console.error(err)
      setError(getWalletErrorMessage({ error: err as Error, lang }))
    }
  }

  /**
   * Costs
   */
  const estimateGas = async () => {
    // TODO: return if account has already pre-ordered or no available quantity
    if (
      !inPreOrder ||
      !unitPrice ||
      !quantity ||
      quantity < PRE_ORDER_MIN_QUANTITY
    ) {
      return
    }

    try {
      const gas = (await contract.estimateGas.preOrder(
        ethers.BigNumber.from(quantity),
        {
          value: unitPrice.mul(quantity),
        }
      )) as ethers.BigNumber

      // add buffer
      const maxGas = gas.mul(3).div(2)

      setGasLimit(maxGas)

      // get gas price
      if (library) {
        const price = await library.getGasPrice()
        setGasPrice(price)
      }
    } catch (err) {
      console.error(err)
      setError(
        getWalletErrorMessage({ type: WalletErrorType.unablePreOrder, lang })
      )
    }
  }
  const getPreOrderCost = () => {
    if (!unitPrice || !quantity) {
      return
    }

    return unitPrice.mul(quantity)
  }
  const getGasCost = () => {
    if (!gasLimit || !gasPrice) {
      return
    }

    return gasLimit.mul(gasPrice)
  }
  const getTotalCost = () => {
    const gasCost = getGasCost()
    const preOrderCost = getPreOrderCost()

    if (!gasCost || !preOrderCost) {
      return
    }

    return preOrderCost.add(gasCost)
  }

  /**
   * Pre Order
   */
  const checkPreOrdered = async () => {
    if (!contract || !account) {
      return
    }

    try {
      const isPreOrdered = await contract.preOrderExist(account)
      setPreOrdered(isPreOrdered)

      if (isPreOrdered) {
        setError(
          getWalletErrorMessage({ type: WalletErrorType.preOrderExist, lang })
        )
      }
    } catch (err) {
      console.error(err)
      setError(getWalletErrorMessage({ error: err as Error, lang }))
    }
  }
  const preOrder = async () => {
    if (
      !gasLimit ||
      !unitPrice ||
      !quantity ||
      quantity < PRE_ORDER_MIN_QUANTITY
    ) {
      return
    }

    setPending(true)
    setError("")

    // TODO: supports qty
    try {
      const tx = await contract.preOrder({
        value: unitPrice.mul(quantity),
        gasLimit,
      })
      const receipt = await tx.wait()

      if (onPreOrderConfirm) {
        onPreOrderConfirm(receipt)
      }
    } catch (err) {
      console.error(err)
      setError(
        getWalletErrorMessage({ type: WalletErrorType.unablePreOrder, lang })
      )
    }

    setPending(false)
  }

  useEffect(() => {
    if (!fetchOnMount) {
      return
    }

    getContractInfo()
    estimateGas()
    connectContractToSigner()
  }, [!!library, !!unitPrice, inPreOrder])

  return {
    contract,

    // `preOrder` requires contract connected to signer
    isConnectedToSigner: !!contract.signer,

    gasLimit,
    gasPrice,
    inPreOrder,
    unitPrice,
    quantity,

    getContractInfo,
    estimateGas,

    pending,
    error,
    preOrder,

    preOrdered,
    checkPreOrdered,

    getPreOrderCost,
    getGasCost,
    getTotalCost,
  }
}
