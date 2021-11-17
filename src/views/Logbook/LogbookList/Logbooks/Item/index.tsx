import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { IconArrowRight, Logbook } from "~/components"

import * as styles from "./styles.module.css"

const Item = ({ logbook }: { logbook: Logbook }) => {
  const { locale } = useLocalization()

  return (
    <Link to={`/logbooks/${logbook.tokenId}`} language={locale}>
      <section className={styles.item}>
        <section className={styles.left}>
          <section className={styles.avatar}>
            <img src={logbook.tokenImageURL} />
          </section>

          <section>
            <h4 className={styles.name}>Traveloggers #{logbook.tokenId}</h4>
            <p className={styles.info}>Edited {logbook.logs.length}</p>
          </section>
        </section>

        <IconArrowRight size="lg" />
      </section>
    </Link>
  )
}

export default Item
