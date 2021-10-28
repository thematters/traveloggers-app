export enum Lang {
  en = "en",
  zh = "zh",
}

export const BREAKPOINTS = {
  SM: 768,
  MD: 1024,
  LG: 1280,
}

export const KEYCODES = {
  enter: 13,
  escape: 27,
  tab: 9,
  backSpace: 8,
  up: 38,
  down: 40,
  v: 86,
}

export enum CryptoWalletSignaturePurpose {
  airdrop = "airdrop",
  connect = "connect",
}

export enum WalletConnector {
  MetaMask = "MetaMask",
  WalletConnect = "WalletConnect",
}

export enum WalletErrorType {
  // common
  noEthereumProvider = "noEthereumProvider",
  unsupportedChainId = "unsupportedChainId",
  userRejectedRequest = "userRejectedRequest",
  unknown = "unknown",
  // contract
  failedToEstimateGas = "failedToEstimateGas",
  failedToSendTx = "failedToSendTx",
  preOrderExist = "preOrderExist",
  preOrderNotStarted = "preOrderNotStarted",
  preOrderReachLimit = "preOrderReachLimit",
  preOrderInvalidUnitPrice = "preOrderInvalidUnitPrice",
  // sign message
  userRejectedSignMessage = "userRejectedSignMessage",
}

export const PRE_ORDER_MIN_QUANTITY = 1
