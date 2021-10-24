import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import React from "react"

import { CardButton, IconArrowRight, IconWallet } from "~/components"

type ConnectWalletButtonProps = {
  onClick: () => void
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  onClick,
}) => {
  const { error } = useWeb3React<ethers.providers.Web3Provider>()

  return (
    <CardButton
      title="請連接加密錢包"
      leftIcon={<IconWallet size="xlM" />}
      right={<IconArrowRight />}
      onClick={onClick}
      disabled={!!error}
    />
  )
}
