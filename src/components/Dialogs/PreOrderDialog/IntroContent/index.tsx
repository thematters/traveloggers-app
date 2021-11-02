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
          {locale === Lang.en
            ? "Anyone with an Ethereum wallet can participate in pre-orders. Each wallet address can purchase up to 5 Traveloggers. Pre-order amount is limited. Registered users of Matters.news can sign in, connect Ethereum wallet, and enjoy benefits. If you don’t have an account on Matters.news yet, we sincerely welcome you to join!"
            : "任何擁有 Ethereum 錢包的朋友即可進行預購，每個錢包地址購買上限為 5 個，總預購數量有限，請把握機會。預購活動結束後，用戶可以登入 Matters.news 帳戶進行綁定，綁定完成將享有福利。"}
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
        {loading ? (
          <IconSpinner />
        ) : (
          <>{locale === Lang.en ? "Pre-order Now" : "參加預購"}</>
        )}
      </Dialog.CTAButton>
    </>
  )
}

export default IntroContent
