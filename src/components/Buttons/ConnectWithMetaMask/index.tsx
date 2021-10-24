import React from "react"

import {
  CardButton,
  IconArrowRight,
  IconMetaMask,
  IconSpinner,
} from "~/components"

type MetaMaskButtonProps = {
  loading?: boolean
  disabled?: boolean
  onClick: () => void
}

export const MetaMaskButton: React.FC<MetaMaskButtonProps> = ({
  loading,
  disabled,
  onClick,
}) => (
  <CardButton
    title="MetaMask"
    leftIcon={<IconMetaMask size="xlM" />}
    right={loading ? <IconSpinner /> : <IconArrowRight />}
    onClick={onClick}
    disabled={disabled || loading}
  />
)
