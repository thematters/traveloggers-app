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
    // common
    [WalletErrorType.noEthereumProvider]:
      "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.",
    [WalletErrorType.unsupportedChainId]: `You're connected to an unsupported network, please switch to ${chainName}.`,
    [WalletErrorType.userRejectedRequest]:
      "Please authorize this website to access your Ethereum account.",
    [WalletErrorType.unknown]:
      "An unknown error occurred, please make sure your wallet and network are in working.",
    // sign message
    [WalletErrorType.userRejectedSignMessage]:
      "Please sign the message to complete the operation.",
    // contract
    [WalletErrorType.failedToEstimateGas]:
      "Insufficient balance or network error.",
    [WalletErrorType.failedToSendTx]: "Failed to send transaction.",
    [WalletErrorType.preOrderExist]: "This account has been pre-ordered.",
    [WalletErrorType.preOrderNotStarted]: "Pre-order isn' started yet.",
    [WalletErrorType.preOrderReachLimit]: "Reach pre-order limit.",
    [WalletErrorType.preOrderInvalidUnitPrice]: "Invalid amount.",
    [WalletErrorType.logbookNotOwner]: "This account is not the token owner.",
    [WalletErrorType.logbookLocked]: "Logbook is locked.",
  },
  [Lang.zh]: {
    // common
    [WalletErrorType.noEthereumProvider]: "請先安装 MetaMask 擴充",
    [WalletErrorType.unsupportedChainId]: `請先切換網絡到 ${chainName}`,
    [WalletErrorType.userRejectedRequest]: "請先授權本網站獲取你的以太坊地址",
    [WalletErrorType.unknown]: "發生未知錯誤，請確保你的錢包和網絡正常",
    // sign message
    [WalletErrorType.userRejectedSignMessage]: "請簽署以完成操作",
    // contract
    [WalletErrorType.failedToEstimateGas]: "錢包餘額不足或網絡錯誤",
    [WalletErrorType.failedToSendTx]: "交易請求發送失敗",
    [WalletErrorType.preOrderExist]: "此錢包已有預購紀錄，請變更錢包以繼續操作",
    [WalletErrorType.preOrderNotStarted]: "預購尚未開始",
    [WalletErrorType.preOrderReachLimit]: "超出預購數量限制",
    [WalletErrorType.preOrderInvalidUnitPrice]: "預購金額不正確",
    [WalletErrorType.logbookNotOwner]:
      "此錢包非 NFT 擁有者，無權限寫入航行日誌",
    [WalletErrorType.logbookLocked]: "你已寫過航行日誌",
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

export const maskAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

export type EtherscanObject = {
  url: string
  hash: string
  maskedHash: string
}

export const toEtherscanUrl = (hash: string): EtherscanObject => {
  const etherscanDomain =
    env.supportedChainId === 4 ? "rinkeby.etherscan.io" : "etherscan.io"
  const maskedHash = maskAddress(hash)

  return {
    url: `https://${etherscanDomain}/tx/${hash}`,
    hash,
    maskedHash,
  }
}

export const toEtherscanAddressUrl = (address: string) => {
  const etherscanDomain =
    env.supportedChainId === 4 ? "rinkeby.etherscan.io" : "etherscan.io"
  const maskedAddress = maskAddress(address)

  return {
    url: `https://${etherscanDomain}/address/${address}`,
    address,
    maskedAddress,
  }
}
