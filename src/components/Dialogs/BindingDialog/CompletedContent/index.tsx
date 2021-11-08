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
            ? "You have successfully bound account 🎉"
            : "你已成功綁定帳號 🎉"}
        </p>

        <p className={styles.content}>
          <span>{locale === Lang.en ? "Back to " : "返回 "}</span>
          <a href="https://matters.news" className={styles.highlight}>
            {locale === Lang.en ? "Matters" : "Matters 主站"}
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
