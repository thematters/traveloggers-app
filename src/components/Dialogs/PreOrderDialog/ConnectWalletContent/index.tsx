import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useEffect } from "react"

import { Dialog, MetaMaskButton, WalletConnectButton } from "~/components"
import { Lang, WalletConnector } from "~/enums"
import { getWalletErrorMessage, walletConnectors } from "~/utils"

import * as styles from "./styles.module.css"

type ConnectWalletContentProps = {
  prevStep: () => void
}

const ConnectWalletContent: React.FC<ConnectWalletContentProps> = ({
  prevStep,
}) => {
  const { locale } = useLocalization()
  const lang = locale as Lang

  const { activate, connector, account, error } =
    useWeb3React<ethers.providers.Web3Provider>()

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // back to pre-order if wallet is connected
  useEffect(() => {
    if (!account) {
      return
    }

    prevStep()
  }, [account])

  const connectorMetaMask = walletConnectors[WalletConnector.MetaMask]
  const connectorWalletConnect = walletConnectors[WalletConnector.WalletConnect]

  return (
    <Dialog.Content>
      <section className={styles.content}>
        <p>
          {locale === Lang.en
            ? "Select a wallet, or register a new wallet"
            : "選擇一個錢包，或者註冊新的錢包"}
        </p>

        <section className={styles.buttons}>
          <MetaMaskButton
            onClick={() => {
              setActivatingConnector(connectorMetaMask)
              activate(connectorMetaMask)
            }}
            loading={activatingConnector === connectorMetaMask}
          />
          <WalletConnectButton
            onClick={() => {
              setActivatingConnector(connectorWalletConnect)
              activate(connectorWalletConnect)
            }}
          />
        </section>

        {error && (
          <Dialog.Message>
            <p>{getWalletErrorMessage({ error, lang })}</p>
          </Dialog.Message>
        )}
      </section>
    </Dialog.Content>
  )
}

export default ConnectWalletContent
