import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useState } from "react"

import { Dialog } from "~/components"
import { Lang } from "~/enums"
import { useDialogSwitch, useStep } from "~/hooks"

import CompletedContent from "./CompleteContent"
import TypeAddress from "./TypeAddress"

type Step = "typeAddress" | "completed"

type TransferDialogProps = {
  tokenId: string
  defaultStep?: Step
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

export const TransferDialog: React.FC<TransferDialogProps> = ({
  tokenId,
  defaultStep = "typeAddress",
  children,
}) => {
  const { locale } = useLocalization()

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(false)

  const { currStep, forward } = useStep<Step>(defaultStep)

  const openDialog = () => {
    forward(defaultStep)
    baseOpenDialog()
  }

  const isTypeAddress = currStep === "typeAddress"
  const isCompleted = currStep === "completed"

  const [txReceipt, setTxReceipt] =
    useState<ethers.providers.TransactionReceipt | null>(null)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            isCompleted ? (
              <span>
                {locale === Lang.en
                  ? "Avatar sent successfully"
                  : "Avatar sent successfully"}
              </span>
            ) : (
              <span>{locale === Lang.en ? "Send Avatar" : "Send Avatar"}</span>
            )
          }
          closeDialog={closeDialog}
        />

        {isTypeAddress && (
          <TypeAddress
            tokenId={tokenId}
            onConfirm={(receipt: ethers.providers.TransactionReceipt) => {
              forward("completed")
              setTxReceipt(receipt)
            }}
          />
        )}

        {isCompleted && txReceipt && (
          <CompletedContent
            tokenId={tokenId}
            txReceipt={txReceipt}
            closeDialog={closeDialog}
          />
        )}
      </Dialog>
    </>
  )
}
