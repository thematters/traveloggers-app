import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { IconArrowRight, Logbook } from "~/components"
import { Lang } from "~/enums"
import { useAccount } from "~/hooks"
import { maskAddress } from "~/utils"

import * as styles from "./styles.module.css"

const Item = ({ logbook }: { logbook: Logbook }) => {
  const { locale } = useLocalization()
  const { account } = useAccount()

  return (
    <Link to={`/logbooks/${logbook.tokenId}`} language={locale}>
      <section className={styles.item}>
        <section className={styles.content}>
          <section className={styles.left}>
            <section className={styles.avatar}>
              <img src={logbook.tokenImageURL} />
            </section>

            <section>
              <h4 className={styles.name}>Traveloggers #{logbook.tokenId}</h4>
              <p className={styles.info}>
                {locale === Lang.en
                  ? `${logbook.logs.length} entries`
                  : `${logbook.logs.length} 次寫入記錄`}
              </p>
            </section>
          </section>

          <IconArrowRight size="lg" />
        </section>

        {logbook.tokenOwner !== account && (
          <span className={styles.owner}>
            Owner: {maskAddress(logbook.tokenOwner as string, 20)}
          </span>
        )}
      </section>
    </Link>
  )
}

export default Item
