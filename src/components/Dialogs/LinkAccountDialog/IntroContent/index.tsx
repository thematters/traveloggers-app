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
import { useLinkAccount } from "~/hooks"
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
  const { link, loading: linking, error, linkError } = useLinkAccount()

  const isSignedIn = !!viewer?.id && !loading && !signInError
  const isConnectWallet = !!account && !walletError
  const canLink = isSignedIn && isConnectWallet

  return (
    <>
      <Dialog.Content>
        <p>
          {locale === Lang.en
            ? "你可以將錢包和你在 matters.news 上的帳戶綁定或者更換，以更好地在 matters.news 上使用 Traveloggers "
            : "Connect a wallet to your matters.news account, or use a linked account to enhance your Traveloggers experience."}
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
        {linkError && (
          <Dialog.Message>
            <p>{linkError}</p>
          </Dialog.Message>
        )}
      </Dialog.Content>

      <Dialog.CTAButton
        disabled={!canLink || linking}
        onClick={() => link({ callback: gotoCompleted })}
      >
        {linking ? (
          <IconSpinner />
        ) : (
          <>{locale === Lang.en ? "Link Account" : "綁定帳號"}</>
        )}
      </Dialog.CTAButton>
    </>
  )
}

export default IntroContent
