import React from "react"

import { Button } from "~/components/Button"
import { useResponsive } from "~/hooks"

interface CloseButtonProps {
  closeDialog: () => void
}

export const CloseButton = ({ closeDialog }: CloseButtonProps) => {
  const isSmallUp = useResponsive("sm-up")

  return (
    <Button
      onClick={closeDialog}
      width={isSmallUp ? "2rem" : undefined}
      height={isSmallUp ? "2rem" : undefined}
    >
      {!isSmallUp && <span>Close</span>}
      {isSmallUp && <span>Close Icon</span>}
    </Button>
  )
}
