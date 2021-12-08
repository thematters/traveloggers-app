import classNames from "classnames"
import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import React, { useState } from "react"
import { Waypoint } from "react-waypoint"

import {
  Button,
  IconLogo,
  LanguageSwitch,
  LinkAccountDialog,
  TextIcon,
} from "~/components"
import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"
import { analytics } from "~/utils"

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
          <div>
            <LanguageSwitch originalPath={originalPath} />
          </div>

          <Socials />

          <div>
            <LinkAccountDialog>
              {({ openDialog }) => (
                <Button
                  color="primary"
                  spacingX="1.25rem"
                  spacingY=".5rem"
                  onClick={() => {
                    analytics("click_button", {
                      type: "link_account",
                    })
                    openDialog()
                  }}
                >
                  {locale === Lang.en ? "Link Account" : "綁定帳號"}
                </Button>
              )}
            </LinkAccountDialog>
          </div>

          <div className={styles.logbookBtn}>
            <Button
              color="primary"
              height="2.125rem"
              spacingX="1.25rem"
              spacingY=".5rem"
              to="/logbooks"
            >
              {locale === Lang.en ? "Logbooks" : "航行日誌"}
            </Button>
          </div>
        </section>
      </header>
    </>
  )
}

export default Header
