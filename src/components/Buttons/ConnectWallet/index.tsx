import React from "react"

import { CardButton, IconArrowRight, IconWallet } from "~/components"

type ConnectWalletButtonProps = {
  onClick: () => void
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  onClick,
}) => {
  return (
    <CardButton
      title="請連接加密錢包"
      leftIcon={<IconWallet size="xlM" />}
      right={<IconArrowRight />}
      onClick={onClick}
    />
  )
}
