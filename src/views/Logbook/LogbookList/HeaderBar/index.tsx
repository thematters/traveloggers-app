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
import { useAccount, useResponsive } from "~/hooks"
import { analytics } from "~/utils"

import * as styles from "./styles.module.css"

const HeaderBar = () => {
  const { locale } = useLocalization()

  const isMediumUp = useResponsive("md-up")
  const iconSize = isMediumUp ? "xl" : "lg"

  const { account } = useAccount()

  return (
    <section className={styles.headerBar}>
      <section className={styles.left}>
        <Link to="/" language={locale}>
          <IconChevonLeft size={iconSize} color="gold" />
        </Link>
      </section>

      <section className={styles.title}>
        <h1>{locale === Lang.en ? "LOGBOOK" : "航行日誌"}</h1>
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
              {account ? (
                <IconUserChecked size={iconSize} />
              ) : (
                <IconUserAnon size={iconSize} />
              )}
            </button>
          )}
        </LinkAccountDialog>
      </section>
    </section>
  )
}

export default HeaderBar
