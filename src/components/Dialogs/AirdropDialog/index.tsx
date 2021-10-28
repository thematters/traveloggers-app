import React from "react"

import { Dialog } from "~/components"
import { useDialogSwitch, useStep } from "~/hooks"

import CompletedContent from "./CompletedContent"
import ConnectWalletContent from "./ConnectWalletContent"
import IntroContent from "./IntroContent"

type AirdriopDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

type Step = "intro" | "connect-wallet" | "completed"

export const AirdriopDialog: React.FC<AirdriopDialogProps> = ({ children }) => {
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(false)

  const defaultStep = "intro"
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
              <span>參與空投</span>
            ) : isConnectWallet ? (
              <span>連接錢包</span>
            ) : (
              <span>你已成功參加空投囉 🎉</span>
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
