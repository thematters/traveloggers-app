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

interface Props {
  title?: string
  rightButtonLink?: string
}

const HeaderBar: React.FC<Props> = ({ title, rightButtonLink }) => {
  const { locale } = useLocalization()
  const { account, deactivate } = useAccount()

  return (
    <header className={styles.headerBar}>
      <section className={styles.left}>
        <Link to="/" language={locale}>
          <IconChevonLeft color="gold" />
        </Link>
      </section>

      <section className={styles.title}>
        <h1 className={locale === Lang.en ? "" : styles.zh}>
          {title || (locale === Lang.en ? "LOGBOOK" : "航行日誌")}
        </h1>
      </section>

      <section className={styles.right}>
        {rightButtonLink ? (
          <Link to={rightButtonLink} language={locale}>
            <IconUserAnon />
          </Link>
        ) : (
          <LinkAccountDialog defaultStep="connect-wallet">
            {({ openDialog }) => (
              <button
                onClick={() => {
                  if (account) {
                    analytics("click_button", {
                      type: "logbooks_change_wallet",
                    })
                    deactivate()
                  } else {
                    analytics("click_button", {
                      type: "logbooks_connect_wallet",
                    })
                  }
                  openDialog()
                }}
              >
                {account ? <IconUserChecked /> : <IconUserAnon />}
              </button>
            )}
          </LinkAccountDialog>
        )}
      </section>
    </header>
  )
}

export default HeaderBar
