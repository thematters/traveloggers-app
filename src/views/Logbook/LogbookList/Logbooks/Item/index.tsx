import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import React from "react"

// import env from "@/.env.json"
import { IconArrowRight, IconLogbook, Logbook } from "~/components"
import { Lang } from "~/enums"
// import { useAccount } from "~/hooks"
import { maskAddress } from "~/utils"

import * as styles from "./styles.module.css"

/* const ETHERSCAN_BASE_URL =
  env.env === "development"
    ? "https://rinkeby.etherscan.io"
    : "https://etherscan.io" */

interface Props {
  logbook: Logbook
  skipShowOwnerIfOwnedBy: string
}

const Item: React.FC<Props> = ({ logbook, skipShowOwnerIfOwnedBy }) => {
  const { locale } = useLocalization()
  // const { account } = useAccount()

  return (
    <section className={styles.item}>
      <Link to={`/logbooks/${logbook.tokenId}`} language={locale}>
        <section className={styles.content}>
          <section className={styles.left}>
            <section className={styles.avatar}>
              <img src={logbook.tokenImageURL} />
            </section>
            <section className={styles.logbook}>
              {/* <img src={`/images/logbook.svg`} /> */}
              <IconLogbook size="lg" />
            </section>

            <section>
              <h4 className={styles.name}>Traveloggers #{logbook.tokenId}</h4>
              <p className={styles.info}>
                {locale === Lang.en
                  ? `Total ${logbook.logs.length} entries`
                  : `累積 ${logbook.logs.length} 次寫入記錄`}
              </p>
              <p className={styles.info}>
                {locale === Lang.en
                  ? `Total ${0} transfers`
                  : `累積 ${0} 次日誌傳遞記錄`}
              </p>
            </section>
          </section>

          <IconArrowRight size="lg" />
        </section>
      </Link>

      {logbook.tokenOwner !== skipShowOwnerIfOwnedBy && (
        <footer className={styles.owner}>
          <Link
            to={`/owner/${logbook.tokenOwner}`}
            language={locale}
            // href={`${ETHERSCAN_BASE_URL}/address/${logbook.tokenOwner}`}
            // target="_blank"
            // rel="noreferrer"
          >
            {locale === Lang.en ? "Owner" : "擁有者"}:{" "}
            {maskAddress(logbook.tokenOwner as string, 25)}
          </Link>
        </footer>
      )}
    </section>
  )
}

export default Item
