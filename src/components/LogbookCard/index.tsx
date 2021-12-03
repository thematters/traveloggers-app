import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { IconLogbook, Logbook } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

export const LogbookCard = ({ logbook }: { logbook: Logbook }) => {
  const { locale } = useLocalization()

  const logCount = logbook.logs.length

  return (
    <Link
      className={styles.item}
      to={`/logbooks/${logbook.tokenId}`}
      language={locale}
    >
      <section className={styles.content}>
        <section className={styles.left}>
          <section className={styles.avatars}>
            <img className={styles.avatar} src={logbook.tokenImageURL} />
            <IconLogbook size="md" />
          </section>

          <section>
            <h4 className={styles.name}>
              {locale === Lang.en
                ? `${logCount} entries`
                : `累積 ${logCount} 篇`}
            </h4>
            <p className={styles.info}>
              {locale === Lang.en
                ? `transferred ${logCount + 1} times`
                : `日誌傳遞過 ${logCount + 1} 次`}
            </p>
          </section>
        </section>
      </section>
    </Link>
  )
}
