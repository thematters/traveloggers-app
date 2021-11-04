import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Dialog } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

type CompletedContentProps = {
  closeDialog: () => void
}

const CompletedContent: React.FC<CompletedContentProps> = ({ closeDialog }) => {
  const { locale } = useLocalization()

  return (
    <>
      <Dialog.Content>
        <p className={styles.content}>
          {locale === Lang.en
            ? "You have successfully registered for airdrop 🎉"
            : "你已成功登記參加空投囉 🎉"}
        </p>

        <p className={styles.content}>
          {locale === Lang.en ? (
            <>
              Airdrop begins on
              <span className={styles.highlight}>&nbsp;2021/11/12&nbsp;</span>
            </>
          ) : (
            <>
              空投將在
              <span className={styles.highlight}>&nbsp;2021/11/12&nbsp;</span>
              進行
            </>
          )}
        </p>
      </Dialog.Content>

      <Dialog.CTAButton color="blackLight" onClick={closeDialog}>
        {locale === Lang.en ? "Complete" : "完成"}
      </Dialog.CTAButton>
    </>
  )
}

export default CompletedContent
