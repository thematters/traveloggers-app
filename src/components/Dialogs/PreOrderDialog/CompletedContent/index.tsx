import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Dialog, IconExternal, TextIcon } from "~/components"
import { Lang } from "~/enums"
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
  const { locale } = useLocalization()

  const txHash = txReceipt.transactionHash
  const { url, maskedHash } = toEtherscanUrl(txHash)

  return (
    <>
      <Dialog.Content>
        <p className={styles.content}>
          {locale === Lang.en
            ? "You have successfully pre-ordered 🎉"
            : "你已成功預購 🎉"}
        </p>

        <p className={styles.content}>
          {locale === Lang.en ? (
            <>
              Your Traveloggers will be revealed at noon on
              <span className={styles.highlight}>&nbsp;November 12, 2021</span>.
            </>
          ) : (
            <>
              你購買的 Traveloggers 將會在
              <span className={styles.highlight}>&nbsp;2021/11/12&nbsp;</span>
              中午揭曉
            </>
          )}
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

      <Dialog.CTAButton color="blackLight" onClick={closeDialog}>
        {locale === Lang.en ? "Complete" : "完成"}
      </Dialog.CTAButton>
    </>
  )
}

export default CompletedContent
