export enum Lang {
  en = "en",
  zhHant = "zh-hant",
  zhHans = "zh",
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
  noEthereumProvider = "noEthereumProvider",
  unsupportedChainId = "unsupportedChainId",
  userRejectedRequest = "userRejectedRequest",
  unablePreOrder = "unablePreOrder",
  preOrderExist = "preOrderExist",
  userRejectedSignMessage = "userRejectedSignMessage",
  unknown = "unknown",
}

// TBC: get from contract or hard coding
export const PRE_ORDER_MIN_QUANTITY = 1
export const PRE_ORDER_MAX_QUANTITY = 5
