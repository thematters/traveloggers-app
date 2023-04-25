import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Dialog } from "~/components"
import { Lang } from "~/enums"

type IntroContentProps = {
  gotoConnectWallet: () => void
  gotoCompleted: () => void
}

const IntroContent: React.FC<IntroContentProps> = ({
  gotoConnectWallet,
  gotoCompleted,
}) => {
  const { locale } = useLocalization()

  return (
    <>
      <Dialog.Content>
        <p>
          {locale === Lang.en
            ? "Connect a wallet to your Matters.Town account, or use a linked account to enhance your Traveloggers experience."
            : "你可以將錢包和你在 Matters.Town 上的帳戶綁定，以更好地在 Matters.Town 上使用 Traveloggers。"}
        </p>
      </Dialog.Content>

      <Dialog.CTAButton
        htmlHref="https://matters.town/me/settings"
        htmlTarget="_blank"
      >
        {locale === Lang.en
          ? "Continue on Matters.Town"
          : "前往 Matters.Town 綁定"}
      </Dialog.CTAButton>
    </>
  )
}

export default IntroContent
