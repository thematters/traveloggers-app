import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import React from "react"

import env from "@/.env.json"
import { IconArrowRight, Logbook } from "~/components"
import { Lang } from "~/enums"
import { useAccount } from "~/hooks"
import { maskAddress } from "~/utils"

import * as styles from "./styles.module.css"

const ETHERSCAN_BASE_URL =
  env.env === "development"
    ? "https://rinkeby.etherscan.io"
    : "https://etherscan.io"

const Item = ({ logbook }: { logbook: Logbook }) => {
  const { locale } = useLocalization()
  const { account } = useAccount()

  return (
    <Link
      className={styles.item}
      to={`/logbooks/${logbook.tokenId}`}
      language={locale}
    >
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
        <footer className={styles.owner}>
          <a
            href={`${ETHERSCAN_BASE_URL}/address/${logbook.tokenOwner}`}
            target="_blank"
            rel="noreferrer"
          >
            {locale === Lang.en ? "Owner" : "擁有者"}:{" "}
            {maskAddress(logbook.tokenOwner as string, 25)}
          </a>
        </footer>
      )}
    </Link>
  )
}

export default Item
