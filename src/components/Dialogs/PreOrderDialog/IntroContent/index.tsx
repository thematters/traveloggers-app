import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useEffect } from "react"

import {
  ConnectedAccountButton,
  ConnectWalletButton,
  Dialog,
  IconSpinner,
} from "~/components"
import { Lang } from "~/enums"
import { usePreOrder } from "~/hooks"
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
  const { locale } = useLocalization()
  const lang = locale as Lang

  const { account, error: walletError } =
    useWeb3React<ethers.providers.Web3Provider>()

  const { loading, error: preOrderError, canPreOrder } = usePreOrder({})

  // check on account changes
  useEffect(() => {
    canPreOrder(false)
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

        {(walletError || preOrderError) && (
          <Dialog.Message>
            <p>
              {walletError
                ? getWalletErrorMessage({ error: walletError, lang })
                : preOrderError}
            </p>
          </Dialog.Message>
        )}
      </Dialog.Content>

      <Dialog.CTAButton
        onClick={gotoConfirm}
        disabled={!account || loading || !!preOrderError}
      >
        {loading ? <IconSpinner /> : "參加預購"}
      </Dialog.CTAButton>
    </>
  )
}

export default IntroContent
