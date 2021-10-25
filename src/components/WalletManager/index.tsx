// import { useWeb3React } from "@web3-react/core"
import React from "react"

import { useEagerConnect, useInactiveListener } from "~/hooks"

/**
 * @see {@url https://github.com/Uniswap/interface/blob/eb09894b736b507b2d707c157a4016c74dfc3468/src/components/Web3ReactManager/index.tsx}
 */
export const WalletManager: React.FC = ({ children }) => {
  // const { active, error } = useWeb3React()

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // TODO: error message
  // if (triedEager && !active && error) {
  // }

  return <>{children}</>
}
