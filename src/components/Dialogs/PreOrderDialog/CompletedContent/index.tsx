import { ethers } from "ethers"
import React from "react"

import { Dialog, IconExternal, TextIcon } from "~/components"
import { toEtherscanUrl } from "~/utils"

import * as styles from "./styles.module.css"

type CompletedContentProps = {
  txReceipt: ethers.providers.TransactionReceipt
  closeDialog: () => void
}

const CompletedContent: React.FC<CompletedContentProps> = ({
  txReceipt,
  closeDialog,
}) => {
  const txHash = txReceipt.transactionHash
  const { url, maskedHash } = toEtherscanUrl(txHash)

  return (
    <>
      <Dialog.Content>
        <p className={styles.content}>
          交易紀錄：
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            <TextIcon
              icon={<IconExternal />}
              spacing="xxTight"
              textPlacement="left"
            >
              {maskedHash}
            </TextIcon>
          </a>
        </p>
      </Dialog.Content>

      <Dialog.CTAButton color="blackLight" onClick={closeDialog}>
        完成
      </Dialog.CTAButton>
    </>
  )
}

export default CompletedContent
