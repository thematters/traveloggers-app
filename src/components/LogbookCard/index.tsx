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
            <h4 className={styles.name}>Logbook #{logbook.tokenId}</h4>
            <p className={styles.info}>
              {locale === Lang.en
                ? `${logCount} entries`
                : `累積 ${logCount} 篇`}
            </p>
          </section>
        </section>
      </section>

      <section className={styles.owner}>
        <p>
          {locale === Lang.en ? `Owner: ` : `擁有者：`}
          {logbook.tokenOwner}
        </p>
      </section>
    </Link>
  )
}
