import { useLocalization } from "gatsby-theme-i18n"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import React, { useContext } from "react"

import { IconChevonLeft, LogbookContext } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

type HeaderBarProps = {
  tokenId: string
}

const HeaderBar: React.FC<HeaderBarProps> = ({ tokenId }) => {
  const { locale } = useLocalization()

  const { logbooks } = useContext(LogbookContext)

  const logbook = logbooks[tokenId]

  return (
    <section className={styles.headerBar}>
      <section className={styles.left}>
        <Link to="/logbooks" language={locale}>
          <IconChevonLeft color="gold" />
        </Link>
      </section>

      <section className={styles.title}>
        <h1 className={locale === Lang.en ? "" : styles.zh}>
          {locale === Lang.en ? "Transition: " : "Transition: "}
          {logbook?.loading ? "..." : (logbook?.logs || []).length}
        </h1>
      </section>

      <section className={styles.right}>
        {styles.avatar && (
          <a href={logbook?.tokenOpenSeaURL} target="_blank" rel="noreferrer">
            <img className={styles.avatar} src={logbook?.tokenImageURL} />
          </a>
        )}
      </section>
    </section>
  )
}

export default HeaderBar
