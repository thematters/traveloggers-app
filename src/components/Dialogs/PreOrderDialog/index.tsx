import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useState } from "react"

import { Dialog } from "~/components"
import { Lang } from "~/enums"
import { useDialogSwitch, useStep } from "~/hooks"

import ConnectWalletContent from "../ConnectWalletContent"
import CompletedContent from "./CompletedContent"
import ConfirmContent from "./ConfirmContent"
import IntroContent from "./IntroContent"

type PreOrderDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

type Step = "intro" | "connect-wallet" | "confirm" | "completed"

export const PreOrderDialog: React.FC<PreOrderDialogProps> = ({ children }) => {
  const { locale } = useLocalization()

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
            isConnectWallet ? (
              <span>{locale === Lang.en ? "Connect Wallet" : "連接錢包"}</span>
            ) : (
              <span>{locale === Lang.en ? "Pre-order" : "參加預購"}</span>
            )
          }
          closeDialog={closeDialog}
        />

        {isIntro && (
          <IntroContent
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
