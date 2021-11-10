import classNames from "classnames"
import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import jump from "jump.js"
import React, { useContext, useState } from "react"
import { Waypoint } from "react-waypoint"

import {
  AirdriopDialog,
  BindingDialog,
  Button,
  IconLogo,
  LanguageSwitch,
  PreOrderDialog,
  RoadmapContext,
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

  const { isAirdropStarted, isAirdropEnded } = useContext(RoadmapContext)
  const isAirdropActive = isAirdropStarted && !isAirdropEnded

  const scrollToRoadmap = () => {
    jump("#roadmap", { offset: -100 })
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

          {!isAirdropEnded && (
            <div>
              <PreOrderDialog>
                {({ openDialog }) => (
                  <Button
                    color="primary"
                    spacingX="1.25rem"
                    spacingY=".5rem"
                    onClick={() => {
                      analytics("click_button", {
                        type: "pre_order",
                      })
                      scrollToRoadmap()
                    }}
                  >
                    {locale === Lang.en ? "Pre-order" : "預購"}
                  </Button>
                )}
              </PreOrderDialog>
            </div>
          )}

          {!isAirdropEnded && (
            <div>
              <AirdriopDialog>
                {({ openDialog }) => (
                  <Button
                    color="primary"
                    spacingX="1.25rem"
                    spacingY=".5rem"
                    onClick={() => {
                      analytics("click_button", {
                        type: "air_drop",
                      })
                      if (isAirdropActive) {
                        openDialog()
                      } else {
                        scrollToRoadmap()
                      }
                    }}
                  >
                    {locale === Lang.en ? "Airdrop" : "空投"}
                  </Button>
                )}
              </AirdriopDialog>
            </div>
          )}

          {isAirdropEnded && (
            <div>
              <BindingDialog>
                {({ openDialog }) => (
                  <Button
                    color="primary"
                    spacingX="1.25rem"
                    spacingY=".5rem"
                    onClick={() => {
                      analytics("click_button", {
                        type: "bind",
                      })
                      openDialog()
                    }}
                  >
                    {locale === Lang.en ? "Binding" : "綁定帳號"}
                  </Button>
                )}
              </BindingDialog>
            </div>
          )}
        </section>
      </header>
    </>
  )
}

export default Header
