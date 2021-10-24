import React from "react"

import {
  CardButton,
  IconArrowRight,
  IconSpinner,
  IconWalletConnect,
} from "~/components"

type WalletConnectButtonProps = {
  loading?: boolean
  disabled?: boolean
  onClick: () => void
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  loading,
  disabled,
  onClick,
}) => (
  <CardButton
    title="WalletConnect"
    leftIcon={<IconWalletConnect size="xlM" />}
    right={loading ? <IconSpinner /> : <IconArrowRight />}
    onClick={onClick}
    disabled={disabled || loading}
  />
)

export default WalletConnectButton
