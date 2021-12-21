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
            ? "Your friend can view Travelogger in their collection, and access or edit the Logbook."
            : "接收方將會在 TA 的收藏列表中看到你贈送的 Traveloggers。TA 可以閱讀你所寫下的日誌，並且繼續添增日誌內容。"}
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
