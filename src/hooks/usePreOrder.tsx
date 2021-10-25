import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

import { contractABI, contractAddress } from "@/.env.json"
import { PRE_ORDER_MIN_QUANTITY } from "~/enums"
import { getWalletErrorMessage } from "~/utils"

type UsePreOrderProps = {
  fetchOnMount?: boolean
  onPreOrderConfirm?: (txReceipt: ethers.providers.TransactionReceipt) => void
}

export const usePreOrder = ({
  fetchOnMount = true,
  onPreOrderConfirm,
}: UsePreOrderProps) => {
  const { account, library } = useWeb3React<ethers.providers.Web3Provider>()

  const [contract, setContract] = useState(
    new ethers.Contract(contractAddress, contractABI, library)
  )

  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const [quantity, setQuantity] = useState(PRE_ORDER_MIN_QUANTITY)

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

    // is in PreOrder
    setInPreOrder(await contract.inPreOrder())

    // uni price
    const preOrderUnitPrice = (await contract.minAmount()) as ethers.BigNumber
    setUnitPrice(preOrderUnitPrice)

    // TODO: pre-ordered quantity in current account

    // TODO: available pre-orderable quantity

    // TODO: if account already pre-ordered
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

    // TODO: support qty
    const gas = (await contract.estimateGas.preOrder({
      value: unitPrice.mul(quantity),
    })) as ethers.BigNumber

    // add buffer
    const maxGas = gas.mul(3).div(2)

    setGasLimit(maxGas)

    // get gas price
    if (library) {
      const price = await library.getGasPrice()
      setGasPrice(price)
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
  const isPreOrdered = async () => {
    if (!contract || !account) {
      return
    }
    return contract.preOrderExist(account)
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
      setError(getWalletErrorMessage(err as Error))
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
    isPreOrdered,

    getPreOrderCost,
    getGasCost,
    getTotalCost,
  }
}
