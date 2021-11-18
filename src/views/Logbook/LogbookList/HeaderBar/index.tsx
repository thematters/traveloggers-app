import { useLocalization } from "gatsby-theme-i18n"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import React from "react"

import {
  IconChevonLeft,
  IconUserAnon,
  IconUserChecked,
  LinkAccountDialog,
} from "~/components"
import { Lang } from "~/enums"
import { useAccount } from "~/hooks"
import { analytics } from "~/utils"

import * as styles from "./styles.module.css"

const HeaderBar: React.FC = () => {
  const { locale } = useLocalization()

  const { account } = useAccount()

  return (
    <header className={styles.headerBar}>
      <section className={styles.left}>
        <Link to="/" language={locale}>
          <IconChevonLeft color="gold" />
        </Link>
      </section>

      <section className={styles.title}>
        <h1 className={locale === Lang.en ? "" : styles.zh}>
          {locale === Lang.en ? "LOGBOOK" : "航行日誌"}
        </h1>
      </section>

      <section className={styles.right}>
        <LinkAccountDialog defaultStep="connect-wallet">
          {({ openDialog }) => (
            <button
              onClick={() => {
                analytics("click_button", {
                  type: "link_account",
                })
                openDialog()
              }}
            >
              {account ? <IconUserChecked /> : <IconUserAnon />}
            </button>
          )}
        </LinkAccountDialog>
      </section>
    </header>
  )
}

export default HeaderBar
