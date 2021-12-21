import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import { useState } from "react"

import env from "@/.env.json"
import { Lang, WalletErrorType } from "~/enums"
import { getWalletErrorMessage } from "~/utils"

type UseTransferProps = {
  onSend?: (tx: ethers.providers.TransactionResponse) => void
  onConfirm?: (txReceipt: ethers.providers.TransactionReceipt) => void
}

export const useTransfer = ({ onSend, onConfirm }: UseTransferProps) => {
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
  const [to, setTo] = useState("")
  const [transferring, setTransferring] = useState(false)
  const [error, setError] = useState("")

  const setSendTo = async (address: string) => {
    setError("")

    if (!address) {
      return
    }

    setTransferring(true)

    if (library && address.toLocaleLowerCase().indexOf(".eth") >= 0) {
      try {
        const resolvedAddress = await library.resolveName(address)

        if (!resolvedAddress) {
          throw new Error()
        }

        setTo(resolvedAddress)
        setTransferring(false)
        return
      } catch (err) {
        setError(
          getWalletErrorMessage({
            type: WalletErrorType.invalidAddress,
            lang,
          })
        )
        setTransferring(false)
      }
    }

    try {
      const verifiedAddress = ethers.utils.getAddress(address)
      setTo(verifiedAddress)
      setTransferring(false)
      return
    } catch (err) {
      setError(
        getWalletErrorMessage({
          type: WalletErrorType.invalidAddress,
          lang,
        })
      )
      setTransferring(false)
    }
  }

  const transfer = async ({ tokenId }: { tokenId: string }) => {
    if (!library || !account) {
      return
    }

    // check ownership
    const owner = await contract.ownerOf(tokenId)
    if (owner !== account) {
      setError(
        getWalletErrorMessage({
          type: WalletErrorType.logbookNotOwner,
          lang,
        })
      )
      return
    }

    setTransferring(true)
    setError("")

    try {
      // send transaction
      const tx = await contract
        .connect(library.getSigner())
        .transferFrom(account, to, tokenId)

      if (onSend) {
        onSend(tx)
      }

      // wait for confirmation
      const receipt = await tx.wait()
      if (onConfirm) {
        onConfirm(receipt)
      }
    } catch (err) {
      console.error(err)
      setError(
        getWalletErrorMessage({ type: WalletErrorType.failedToSendTx, lang })
      )
    }

    setTransferring(false)
  }

  return {
    to,
    transferring,
    error,

    setSendTo,
    transfer,
  }
}
