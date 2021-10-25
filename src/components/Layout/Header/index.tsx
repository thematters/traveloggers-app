import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import React from "react"

import {
  AirdriopDialog,
  Button,
  IconLogo,
  LanguageSwitch,
  PreOrderDialog,
  TextIcon,
} from "~/components"
import { Lang } from "~/enums"

import Socials from "./Socials"
import * as styles from "./styles.module.css"

const Header = ({ locale, originalPath }) => {
  // const { locale } = useLocalization()

  return (
    <header className={styles.header}>
      <Link to="/">
        <TextIcon icon={<IconLogo size="xlM" />} spacing="base">
          <span className={styles.name}>Traveloggers</span>
        </TextIcon>
      </Link>

      <section className={styles.buttons}>
        <div className={styles.languageSwitch}>
          <LanguageSwitch color="white" {...{ locale, originalPath }} />
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
                {locale === Lang.en
                  ? "Pre-order"
                  : locale === Lang.zhHans
                  ? "参与预购"
                  : "參與預購"}
              </Button>
            )}
          </PreOrderDialog>
        </div>

        <div>
          <AirdriopDialog>
            {({ openDialog }) => (
              <Button
                color="primary"
                spacingX="1.25rem"
                spacingY=".5rem"
                onClick={openDialog}
              >
                {locale === Lang.en
                  ? "Airdrop"
                  : locale === Lang.zhHans
                  ? "参与空投"
                  : "參與空投"}
              </Button>
            )}
          </AirdriopDialog>
        </div>
      </section>
    </header>
  )
}

export default Header
