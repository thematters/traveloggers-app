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
import { ethers } from "ethers"

import env from "@/.env.json"
import { Lang, WalletConnector, WalletErrorType } from "~/enums"

export const chainName =
  env.supportedChainId === 1 ? "Ethereum Mainnet" : "Rinkeby Test Network"

export const walletConnectors = {
  [WalletConnector.MetaMask]: new InjectedConnector({
    supportedChainIds: [env.supportedChainId],
  }),
  [WalletConnector.WalletConnect]: new WalletConnectConnector({
    infuraId: env.infuraId,
    supportedChainIds: [env.supportedChainId],
  }),
}

const WALLET_ERROR_MESSAGES = {
  [Lang.en]: {
    [WalletErrorType.noEthereumProvider]:
      "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.",
    [WalletErrorType.unsupportedChainId]: `You're connected to an unsupported network, please switch to ${chainName}.`,
    [WalletErrorType.userRejectedRequest]:
      "Please authorize this website to access your Ethereum account.",
    [WalletErrorType.unablePreOrder]: "Insufficient funds or network error.",
    [WalletErrorType.preOrderExist]: "This account has been pre-ordered.",
    [WalletErrorType.userRejectedSignMessage]:
      "Please sign the message to complete the operation.",
    [WalletErrorType.unknown]:
      "An unknown error occurred. Check the console for more details.",
  },
  [Lang.zh]: {
    [WalletErrorType.noEthereumProvider]: "請先安装 MetaMask 擴充",
    [WalletErrorType.unsupportedChainId]: `請先切換網絡到 ${chainName}`,
    [WalletErrorType.userRejectedRequest]: "請先授權本網站獲取你的以太坊地址",
    [WalletErrorType.unablePreOrder]: "錢包餘額不足或網絡錯誤",
    [WalletErrorType.preOrderExist]: "此錢包已有預購紀錄，請變更錢包以繼續操作",
    [WalletErrorType.userRejectedSignMessage]: "請簽署以完成操作",
    [WalletErrorType.unknown]: "發生未知錯誤，請確保你的網絡正常",
  },
}

export const getWalletErrorMessage = ({
  error,
  type,
  lang,
}: {
  error?: Error
  type?: WalletErrorType
  lang: Lang
}) => {
  if (type) {
    return WALLET_ERROR_MESSAGES[lang][type]
  }

  if (error instanceof NoEthereumProviderError) {
    return WALLET_ERROR_MESSAGES[lang][WalletErrorType.noEthereumProvider]
  } else if (error instanceof UnsupportedChainIdError) {
    return WALLET_ERROR_MESSAGES[lang][WalletErrorType.unsupportedChainId]
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return WALLET_ERROR_MESSAGES[lang][WalletErrorType.userRejectedRequest]
  } else {
    console.error(error)
    return WALLET_ERROR_MESSAGES[lang][WalletErrorType.unknown]
  }
}

export const weiToEther = (wei: ethers.BigNumber) => {
  return ethers.utils.formatEther(wei)
}

export const weiToGWei = (wei: ethers.BigNumber) => {
  return ethers.utils.formatUnits(wei, "gwei")
}
