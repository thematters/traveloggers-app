import React from "react"

import { Dialog } from "~/components"
import { useDialogSwitch, useStep } from "~/hooks"

import ConnectWalletContent from "./ConnectWalletContent"
import PreOrderContent from "./PreOrderContent"

type PreOrderDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

type Step = "pre-order" | "connect-wallet"

export const PreOrderDialog: React.FC<PreOrderDialogProps> = ({ children }) => {
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(false)
  const defaultStep = "pre-order"
  const { currStep, forward } = useStep<Step>(defaultStep)

  const openDialog = () => {
    forward(defaultStep)
    baseOpenDialog()
  }

  const isPreOrder = currStep === "pre-order"
  const isConnectWallet = currStep === "connect-wallet"

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={isPreOrder ? <span>參加預購</span> : <span>連接錢包</span>}
          closeDialog={closeDialog}
        />

        {isPreOrder && (
          <PreOrderContent nextStep={() => forward("connect-wallet")} />
        )}
        {isConnectWallet && (
          <ConnectWalletContent prevStep={() => forward("pre-order")} />
        )}
      </Dialog>
    </>
  )
}
