import { ethers } from "ethers"
import React, { useState } from "react"

import { Dialog } from "~/components"
import { useDialogSwitch, useStep } from "~/hooks"

import CompletedContent from "./CompletedContent"
import ConfirmContent from "./ConfirmContent"
import ConnectWalletContent from "./ConnectWalletContent"
import PreOrderContent from "./IntroContent"

type PreOrderDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

type Step = "intro" | "connect-wallet" | "confirm" | "completed"

export const PreOrderDialog: React.FC<PreOrderDialogProps> = ({ children }) => {
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(false)

  const [txReceipt, setTxReceipt] =
    useState<ethers.providers.TransactionReceipt | null>(null)

  const defaultStep = "intro"
  const { currStep, forward } = useStep<Step>(defaultStep)

  const openDialog = () => {
    forward(defaultStep)
    baseOpenDialog()
  }

  const isIntro = currStep === "intro"
  const isConnectWallet = currStep === "connect-wallet"
  const isConfirm = currStep === "confirm"
  const isCompleted = currStep === "completed"

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            isIntro ? (
              <span>參加預購</span>
            ) : isConnectWallet ? (
              <span>連接錢包</span>
            ) : isConfirm ? (
              <span>預購交易確認</span>
            ) : (
              <span>你已成功登記預購 🎉</span>
            )
          }
          closeDialog={closeDialog}
        />

        {isIntro && (
          <PreOrderContent
            gotoConnectWallet={() => forward("connect-wallet")}
            gotoConfirm={() => forward("confirm")}
          />
        )}
        {isConnectWallet && (
          <ConnectWalletContent prevStep={() => forward("intro")} />
        )}
        {isConfirm && (
          <ConfirmContent
            gotoConnectWallet={() => forward("connect-wallet")}
            onConfirm={(receipt: ethers.providers.TransactionReceipt) => {
              forward("completed")
              setTxReceipt(receipt)
            }}
          />
        )}
        {isCompleted && txReceipt && (
          <CompletedContent txReceipt={txReceipt} closeDialog={closeDialog} />
        )}
      </Dialog>
    </>
  )
}
