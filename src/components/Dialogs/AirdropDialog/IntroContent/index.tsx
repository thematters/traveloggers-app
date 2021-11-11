import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext } from "react"

import {
  ConnectedAccountButton,
  ConnectWalletButton,
  Dialog,
  IconSpinner,
  SignInWithMatters,
  ViewerContext,
} from "~/components"
import { Lang } from "~/enums"
import { useAirdrop } from "~/hooks"
import { getWalletErrorMessage } from "~/utils"

import * as styles from "./styles.module.css"

type IntroContentProps = {
  gotoConnectWallet: () => void
  gotoCompleted: () => void
}

const IntroContent: React.FC<IntroContentProps> = ({
  gotoConnectWallet,
  gotoCompleted,
}) => {
  const { locale } = useLocalization()
  const lang = locale as Lang

  const { account, error: walletError } =
    useWeb3React<ethers.providers.Web3Provider>()
  const { viewer, loading, error: signInError } = useContext(ViewerContext)
  const {
    registered,
    registerAirdrop,
    loading: registering,
    error: airdropError,
    registerError,
  } = useAirdrop()

  const isSignedIn = !!viewer?.id && !loading && !signInError
  const isConnectWallet = !!account && !walletError
  const canAirdrop = isSignedIn && isConnectWallet && !registered

  return (
    <>
      <Dialog.Content>
        <p>
          {locale === Lang.en
            ? "Make sure your wallet address is able to connect to your Matters.News account. Each user can only register for airdrops once. We will connect this account to your wallet and airdrop Traveloggers to this wallet"
            : "確認錢包地址與 Matters.News 帳戶可進行綁定。每位用戶只能參與一次空投登記，我們會將此帳戶與錢包綁定，並將 Traveloggers 空投到此錢包。"}
        </p>

        <section className={styles.buttons}>
          {!account && <ConnectWalletButton onClick={gotoConnectWallet} />}
          {account && <ConnectedAccountButton />}
          <SignInWithMatters />
        </section>

        {walletError && (
          <Dialog.Message>
            <p>{getWalletErrorMessage({ error: walletError, lang })}</p>
          </Dialog.Message>
        )}
        {signInError && (
          <Dialog.Message>
            <p>
              {locale === Lang.en
                ? "Failed to sign in, please try again later."
                : "登入失敗，請稍候再試"}
            </p>
          </Dialog.Message>
        )}
        {registered && (
          <Dialog.Message>
            <p>
              {locale === Lang.en
                ? "This Matters acccount has already registered for airdrop, please use another account."
                : "此 Matters 帳戶已有參與空投，請變更以繼續操作"}
            </p>
          </Dialog.Message>
        )}
        {airdropError && (
          <Dialog.Message>
            <p>{airdropError}</p>
          </Dialog.Message>
        )}
        {registerError && (
          <Dialog.Message>
            <p>{registerError}</p>
          </Dialog.Message>
        )}
      </Dialog.Content>

      <Dialog.CTAButton
        disabled={!canAirdrop || registering}
        onClick={() => registerAirdrop({ callback: gotoCompleted })}
      >
        {registering ? (
          <IconSpinner />
        ) : (
          <>{locale === Lang.en ? "Register" : "參與空投"}</>
        )}
      </Dialog.CTAButton>
    </>
  )
}

export default IntroContent
