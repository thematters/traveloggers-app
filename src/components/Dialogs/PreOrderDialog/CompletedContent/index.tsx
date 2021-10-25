import { ethers } from "ethers"
import React from "react"

import { supportedChainId } from "@/.env.json"
import { Dialog, IconExternal, TextIcon } from "~/components"

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
    supportedChainId === 4 ? "rinkeby.etherscan.io" : "etherscan.io"
  const transactionHash = txReceipt.transactionHash

  return (
    <>
      <Dialog.Content>
        <p className={styles.content}>
          交易紀錄：
          <a
            href={`https://${etherscanDomain}/tx/${transactionHash}`}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            <TextIcon
              icon={<IconExternal />}
              spacing="xxTight"
              textPlacement="left"
            >
              {transactionHash}
            </TextIcon>
          </a>
        </p>
      </Dialog.Content>

      <Dialog.CTAButton color="black" onClick={closeDialog}>
        完成
      </Dialog.CTAButton>
    </>
  )
}

export default CompletedContent
