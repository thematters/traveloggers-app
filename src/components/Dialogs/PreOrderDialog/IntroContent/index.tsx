import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import React, { useEffect, useState } from "react"

import {
  Button,
  ConnectedAccountButton,
  ConnectWalletButton,
  Dialog,
} from "~/components"
import { useEagerConnect, useInactiveListener, usePreOrder } from "~/hooks"
import { getWalletErrorMessage } from "~/utils"

import * as styles from "./styles.module.css"

type IntroContentProps = {
  gotoConnectWallet: () => void
  gotoConfirm: () => void
}

const IntroContent: React.FC<IntroContentProps> = ({
  gotoConnectWallet,
  gotoConfirm,
}) => {
  const { account, error } = useWeb3React<ethers.providers.Web3Provider>()

  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager)

  const [preOrderError, setPreOrderError] = useState<string>("")
  const [preOrdered, setPreOrdered] = useState(false)
  const [pending, setPending] = useState(false)
  const { isPreOrdered } = usePreOrder({ fetchOnMount: false })
  const checkAccount = async () => {
    if (!account) {
      return
    }

    setPending(true)

    try {
      if (await isPreOrdered()) {
        setPreOrdered(true)
        setPreOrderError("提醒您：此錢包已有預購紀錄，請變更錢包以繼續操作")
      } else {
        setPreOrdered(false)
        setPreOrderError("")
      }
    } catch (err) {
      setPreOrderError(getWalletErrorMessage(err as Error))
    }

    setPending(false)
  }

  useEffect(() => {
    checkAccount()
  }, [account])

  return (
    <>
      <Dialog.Content>
        <p>
          任何擁有 Ethereum 錢包的朋友即可進行預購。有 Matters
          帳號的會員可以先登入綁定，取得 NFT
          後可以享有福利，也歡迎尚未註冊帳號的朋友成為馬特市一員。
        </p>

        <section className={styles.buttons}>
          {!account && <ConnectWalletButton onClick={gotoConnectWallet} />}
          {account && <ConnectedAccountButton />}
        </section>

        {(error || preOrderError) && (
          <Dialog.ErrorMessage>
            <p>{error ? getWalletErrorMessage(error) : preOrderError}</p>
          </Dialog.ErrorMessage>
        )}
      </Dialog.Content>

      <Dialog.CTAButton
        onClick={gotoConfirm}
        disabled={!account || pending || preOrdered}
      >
        參加預購
      </Dialog.CTAButton>
    </>
  )
}

export default IntroContent
