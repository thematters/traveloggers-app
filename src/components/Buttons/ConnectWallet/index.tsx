import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { CardButton, IconArrowRight, IconWallet } from "~/components"
import { Lang } from "~/enums"
import { analytics } from "~/utils"

type ConnectWalletButtonProps = {
  onClick: () => void
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  onClick,
}) => {
  const { locale } = useLocalization()

  return (
    <CardButton
      title={locale === Lang.en ? "Connect Wallet" : "請連接錢包"}
      leftIcon={<IconWallet size="xlM" />}
      right={<IconArrowRight />}
      onClick={() => {
        analytics("click_button", { type: "connect_wallet" })
        onClick()
      }}
    />
  )
}
