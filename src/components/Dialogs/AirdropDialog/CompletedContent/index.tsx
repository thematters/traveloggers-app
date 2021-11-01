import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import env from "@/.env.json"
import { Dialog } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

type CompletedContentProps = {
  closeDialog: () => void
}

const CompletedContent: React.FC<CompletedContentProps> = ({ closeDialog }) => {
  const { locale } = useLocalization()

  const { airdrop } = env.roadmap
  const airdropStart = new Date(airdrop.start)
  const airdropStartStr = `${airdropStart.getFullYear()}/${
    airdropStart.getMonth() + 1
  }/${airdropStart.getDate()}`

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
              <span className={styles.highlight}>
                &nbsp;{airdropStartStr}&nbsp;
              </span>
            </>
          ) : (
            <>
              空投將在
              <span className={styles.highlight}>
                &nbsp;{airdropStartStr}&nbsp;
              </span>
              進行
            </>
          )}
        </p>
      </Dialog.Content>

      <Dialog.CTAButton color="blackLight" onClick={closeDialog}>
        {locale === Lang.en ? "OK" : "完成"}
      </Dialog.CTAButton>
    </>
  )
}

export default CompletedContent
