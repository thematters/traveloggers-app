import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Button, IconLogo, TextIcon } from "~/components"

import LanguageSwitch from "./LanguageSwitch"
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
        <LanguageSwitch />

        <Socials />

        <div>
          <Button color="primary" spacingX="1.25rem" spacingY=".5rem">
            {locale === "en"
              ? "Pre-order"
              : locale === "zh-hans"
              ? "参与预购"
              : "參與預購"}
          </Button>
        </div>

        <div>
          <Button color="primary" spacingX="1.25rem" spacingY=".5rem">
            {locale === "en"
              ? "Register into the Airdrop"
              : locale === "zh-hans"
              ? "参与空投"
              : "參與空投"}
          </Button>
        </div>
      </section>
    </header>
  )
}

export default Header
