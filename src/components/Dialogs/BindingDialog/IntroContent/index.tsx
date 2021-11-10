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
import { useBinding } from "~/hooks"
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
  const { bind, loading: binding, error, bindError } = useBinding()

  const isSignedIn = !!viewer?.id && !loading && !signInError
  const isConnectWallet = !!account && !walletError
  const canBind = isSignedIn && isConnectWallet

  return (
    <>
      <Dialog.Content>
        <p>
          {locale === Lang.en
            ? "我們會將此帳號與錢包綁定，你可以綁定新的錢包，或變更你的 Matters 帳號。"
            : "我們會將此帳號與錢包綁定，你可以綁定新的錢包，或變更你的 Matters 帳號。"}
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
        {error && (
          <Dialog.Message>
            <p>{error}</p>
          </Dialog.Message>
        )}
        {bindError && (
          <Dialog.Message>
            <p>{bindError}</p>
          </Dialog.Message>
        )}
      </Dialog.Content>

      <Dialog.CTAButton
        disabled={!canBind || binding}
        onClick={() => bind({ callback: gotoCompleted })}
      >
        {binding ? (
          <IconSpinner />
        ) : (
          <>{locale === Lang.en ? "Bind" : "綁定帳號"}</>
        )}
      </Dialog.CTAButton>
    </>
  )
}

export default IntroContent
