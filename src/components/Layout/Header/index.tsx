import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import React from "react"

import {
  Button,
  IconLogo,
  LanguageSwitch,
  PreOrderDialog,
  TextIcon,
} from "~/components"
import { LANG } from "~/enums"

import Socials from "./Socials"
import * as styles from "./styles.module.css"

const Header = () => {
  const { locale } = useLocalization()

  return (
    <header className={styles.header}>
      <Link to="/">
        <TextIcon icon={<IconLogo size="xlM" />} spacing="base">
          <span className={styles.name}>Travelogers</span>
        </TextIcon>
      </Link>

      <section className={styles.buttons}>
        <div className={styles.languageSwitch}>
          <LanguageSwitch color="white" />
        </div>

        <Socials />

        <div>
          <PreOrderDialog>
            {({ openDialog }) => (
              <Button
                color="primary"
                spacingX="1.25rem"
                spacingY=".5rem"
                onClick={openDialog}
              >
                {locale === LANG.en
                  ? "Pre-order"
                  : locale === LANG.zhHans
                  ? "参与预购"
                  : "參與預購"}
              </Button>
            )}
          </PreOrderDialog>
        </div>

        <div>
          <Button color="primary" spacingX="1.25rem" spacingY=".5rem">
            {locale === LANG.en
              ? "Airdrop"
              : locale === LANG.zhHans
              ? "参与空投"
              : "參與空投"}
          </Button>
        </div>
      </section>
    </header>
  )
}

export default Header
