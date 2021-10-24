import { ethers } from "ethers"

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

export enum WalletConnector {
  MetaMask = "MetaMask",
  WalletConnect = "WalletConnect",
}

// TBC: get from contract or hard coding
export const PRE_ORDER_MIN_QUANTITY = 1
export const PRE_ORDER_MAX_QUANTITY = 5
