import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

import { maskAddress } from "~/utils"

export const useAccount = () => {
  const {
    library,
    account,
    deactivate,
    // error,
  } = useWeb3React<ethers.providers.Web3Provider>()

  const maskedAddress = account ? maskAddress(account) : ""

  const [balance, setBalance] = useState<ethers.BigNumber>()
  const getAccountBalance = async () => {
    if (!library || !account) {
      return
    }

    const accountBalance = await library.getBalance(account)
    setBalance(accountBalance)
  }

  useEffect(() => {
    getAccountBalance()
  }, [account, !!library])

  return { account, deactivate, maskedAddress, balance, getAccountBalance }
}
