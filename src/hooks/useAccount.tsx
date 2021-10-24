import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

export const useAccount = () => {
  const { library, account } = useWeb3React<ethers.providers.Web3Provider>()

  const maskedAddress = account
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : ""

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

  return { account, maskedAddress, balance, getAccountBalance }
}
