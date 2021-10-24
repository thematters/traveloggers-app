import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import React, { useEffect } from "react"

import { Dialog, MetaMaskButton, WalletConnectButton } from "~/components"
import { WalletConnector } from "~/enums"
import { getWalletErrorMessage, walletConnectors } from "~/utils"

import * as styles from "./styles.module.css"

type ConnectWalletContentProps = {
  prevStep: () => void
}

const ConnectWalletContent: React.FC<ConnectWalletContentProps> = ({
  prevStep,
}) => {
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
        <p>選擇一個已註冊的裝置，或者註冊新的錢包</p>

        <section className={styles.buttons}>
          <MetaMaskButton
            onClick={() => {
              setActivatingConnector(connectorMetaMask)
              activate(connectorMetaMask)
            }}
            loading={activatingConnector === connectorMetaMask}
            disabled={activatingConnector || !!error}
          />
          <WalletConnectButton
            onClick={() => {
              setActivatingConnector(connectorWalletConnect)
              activate(connectorWalletConnect)
            }}
            loading={activatingConnector === connectorWalletConnect}
            disabled={activatingConnector || !!error}
          />
        </section>

        {error && (
          <Dialog.ErrorMessage>
            <p>{getWalletErrorMessage(error)}</p>
          </Dialog.ErrorMessage>
        )}
      </section>
    </Dialog.Content>
  )
}

export default ConnectWalletContent
