import { ethers } from "ethers"
import React from "react"

import env from "@/.env.json"
import { Dialog, IconExternal, TextIcon } from "~/components"
import { maskAddress } from "~/utils"

import * as styles from "./styles.module.css"

type CompletedContentProps = {
  txReceipt: ethers.providers.TransactionReceipt
  closeDialog: () => void
}

const CompletedContent: React.FC<CompletedContentProps> = ({
  txReceipt,
  closeDialog,
}) => {
  const etherscanDomain =
    env.supportedChainId === 4 ? "rinkeby.etherscan.io" : "etherscan.io"
  const txHash = txReceipt.transactionHash
  const maskedTxHash = maskAddress(txHash)

  return (
    <>
      <Dialog.Content>
        <p className={styles.content}>
          交易紀錄：
          <a
            href={`https://${etherscanDomain}/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            <TextIcon
              icon={<IconExternal />}
              spacing="xxTight"
              textPlacement="left"
            >
              {maskedTxHash}
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
