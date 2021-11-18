import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Dialog } from "~/components"
import { Lang } from "~/enums"
import { useDialogSwitch, useStep } from "~/hooks"

import ConnectWalletContent from "../AirdropDialog/ConnectWalletContent"
import CompletedContent from "./CompletedContent"
import IntroContent from "./IntroContent"

type Step = "intro" | "connect-wallet" | "completed"

type LinkAccountDialogProps = {
  defaultStep?: Step
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

export const LinkAccountDialog: React.FC<LinkAccountDialogProps> = ({
  defaultStep = "intro",
  children,
}) => {
  const { locale } = useLocalization()

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(false)

  // const defaultStep = "intro"
  const { currStep, forward } = useStep<Step>(defaultStep)

  const openDialog = () => {
    forward(defaultStep)
    baseOpenDialog()
  }

  const isIntro = currStep === "intro"
  const isConnectWallet = currStep === "connect-wallet"
  const isCompleted = currStep === "completed"

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            isIntro ? (
              <span>{locale === Lang.en ? "Link Account" : "綁定帳號"}</span>
            ) : isConnectWallet ? (
              <span>{locale === Lang.en ? "Connect Wallet" : "連接錢包"}</span>
            ) : (
              <span>{locale === Lang.en ? "Link Account" : "綁定帳號"}</span>
            )
          }
          closeDialog={closeDialog}
        />

        {isIntro && (
          <IntroContent
            gotoConnectWallet={() => forward("connect-wallet")}
            gotoCompleted={() => forward("completed")}
          />
        )}
        {isConnectWallet && (
          <ConnectWalletContent prevStep={() => forward("intro")} />
        )}
        {isCompleted && <CompletedContent closeDialog={closeDialog} />}
      </Dialog>
    </>
  )
}
