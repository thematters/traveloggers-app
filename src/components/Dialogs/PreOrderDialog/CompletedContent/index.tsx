import { ethers } from "ethers"
import React from "react"

import { supportedChainId } from "@/.env.json"
import { Dialog } from "~/components"

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
        <p>
          交易紀錄：
          <a href={`https://${etherscanDomain}/tx/${transactionHash}`}>
            {transactionHash}
          </a>
        </p>
      </Dialog.Content>

      <Dialog.CTAButton color="blackSemi" onClick={closeDialog}>
        完成
      </Dialog.CTAButton>
    </>
  )
}

export default CompletedContent
