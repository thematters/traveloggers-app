import classNames from "classnames"
import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import React, { useState } from "react"
import { Waypoint } from "react-waypoint"

import {
  AirdriopDialog,
  Button,
  IconLogo,
  LanguageSwitch,
  PreOrderDialog,
  TextIcon,
} from "~/components"
import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"

import Socials from "./Socials"
import * as styles from "./styles.module.css"

type HeaderProps = {
  originalPath: string
}

const Header: React.FC<HeaderProps> = ({ originalPath }) => {
  const { locale } = useLocalization()
  const isMediumUp = useResponsive("md-up")

  const [active, setActive] = useState(false)

  const headerClasses = classNames({
    [styles.header]: true,
    [styles.active]: active,
  })

  const handlePositionChange = ({ currentPosition }: Waypoint.CallbackArgs) => {
    setActive(currentPosition === "above")
  }

  return (
    <>
      <Waypoint onPositionChange={handlePositionChange} />
      <header className={headerClasses}>
        <Link to="/" language={undefined}>
          <TextIcon
            icon={<IconLogo size={isMediumUp ? "xlM" : "lg"} />}
            spacing="base"
          >
            <span className={styles.name}>Traveloggers</span>
          </TextIcon>
        </Link>

        <section className={styles.buttons}>
          <div className={styles.languageSwitch}>
            <LanguageSwitch originalPath={originalPath} />
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
                  {locale === Lang.en ? "Pre-order" : "預購"}
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
                  {locale === Lang.en ? "Airdrop" : "空投"}
                </Button>
              )}
            </AirdriopDialog>
          </div>
        </section>
      </header>
    </>
  )
}

export default Header
