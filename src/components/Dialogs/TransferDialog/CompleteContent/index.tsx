import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Dialog, IconExternal, TextIcon } from "~/components"
import { Lang } from "~/enums"
import { toEtherscanUrl } from "~/utils"

import * as styles from "./styles.module.css"

type CompletedContentProps = {
  tokenId: string
  txReceipt: ethers.providers.TransactionReceipt
  closeDialog: () => void
}

const CompletedContent: React.FC<CompletedContentProps> = ({
  tokenId,
  txReceipt,
  closeDialog,
}) => {
  const { locale } = useLocalization()

  const txHash = txReceipt.transactionHash
  const { url, maskedHash } = toEtherscanUrl(txHash)

  return (
    <>
      <Dialog.Content>
        <p className={styles.content}>
          {locale === Lang.en
            ? "Now your friends will receive gifts in their list, and they're available to read the contents of Logbook."
            : "Now your friends will receive gifts in their list, and they're available to read the contents of Logbook."}
        </p>

        <p className={styles.content}>
          {locale === Lang.en ? "Transaction record:" : "交易紀錄："}
          &nbsp;
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

      <Dialog.CTAButton
        color="blackLight"
        onClick={() => window.location.reload()}
      >
        {locale === Lang.en ? "Complete" : "完成"}
      </Dialog.CTAButton>
    </>
  )
}

export default CompletedContent
