import { UnsupportedChainIdError } from "@web3-react/core"
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector"
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector"

import { infuraId, supportedChainId } from "@/.env.json"
import { WalletConnector } from "~/enums"

export const chainName =
  supportedChainId === 1 ? "Ethereum Mainnet" : "Rinkeby Test Network"

export const walletConnectors = {
  [WalletConnector.MetaMask]: new InjectedConnector({
    supportedChainIds: [supportedChainId],
  }),
  [WalletConnector.WalletConnect]: new WalletConnectConnector({
    infuraId,
    supportedChainIds: [supportedChainId],
  }),
}

export const getWalletErrorMessage = (error: Error) => {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile."
  } else if (error instanceof UnsupportedChainIdError) {
    return `You're connected to an unsupported network, please switch to ${chainName}.`
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return "Please authorize this website to access your Ethereum account."
  } else {
    console.error(error)
    return "An unknown error occurred. Check the console for more details."
  }
}
