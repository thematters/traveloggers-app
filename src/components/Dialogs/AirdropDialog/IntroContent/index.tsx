import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext, useEffect } from "react"

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
  } = useAirdrop()

  const isSignedIn = !!viewer?.id && !loading && !signInError
  const isConnectWallet = !!account && !walletError
  const canAirdrop = isSignedIn && isConnectWallet && !registered

  useEffect(() => {
    if (registered) {
      gotoCompleted()
    }
  }, [registered])

  return (
    <>
      <Dialog.Content>
        <p>
          確認錢包地址與 Matters
          帳號可進行綁定，每位用戶只能參與一次空投，我們會將此帳號與錢包綁定，並將
          NFT 空投到此錢包。
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
            <p>Failed to Sign-In with Matters, please try again later.</p>
          </Dialog.Message>
        )}
        {registered && (
          <Dialog.Message>
            <p>This Ethereum account has registered the airdrop.</p>
          </Dialog.Message>
        )}
        {airdropError && (
          <Dialog.Message>
            <p>{airdropError}</p>
          </Dialog.Message>
        )}
      </Dialog.Content>

      <Dialog.CTAButton
        disabled={!canAirdrop || registering}
        onClick={registerAirdrop}
      >
        {registering ? <IconSpinner /> : "參加空投"}
      </Dialog.CTAButton>
    </>
  )
}

export default IntroContent
