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
            ? "Anyone with an Ethereum wallet can participate in pre-orders. Each wallet address can purchase up to 5 Traveloggers. The Traveloggers purchased during the pre-order period is randomly assigned, which will be revealed at noon on November 12, 2021."
            : "任何擁有 Ethereum 錢包的朋友即可進行預購，每個錢包地址購買上限為 5 個。預購獲得的 Traveloggers 是隨機分配的，你購買的 Traveloggers 將會在 2021/11/12 中午揭曉。"}
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
