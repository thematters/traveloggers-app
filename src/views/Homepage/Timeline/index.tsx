import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext } from "react"

import env from "@/.env.json"
import {
  AirdriopDialog,
  Button,
  Container,
  PreOrderDialog,
  RoadmapContext,
  Section,
} from "~/components"
import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"
import { analytics } from "~/utils"

import * as styles from "./index.module.css"
import Infobox from "./infobox"
import TEXTS from "./texts"
import Time from "./timeline"

const Timeline = () => {
  const { locale } = useLocalization()
  const isMediumUp = useResponsive("md-up")
  const {
    isPreOrderStarted,
    isPreOrderEnded,
    isAirdropStarted,
    isAirdropEnded,
    isOpenSaleStarted,
    isOpenSaleEnded,
  } = useContext(RoadmapContext)
  const isPreOrderActive = isPreOrderStarted && !isPreOrderEnded
  const isAirdropActive = isAirdropStarted && !isAirdropEnded
  const isOpenSaleActive = isOpenSaleStarted && !isOpenSaleEnded

  const preOrderState = isPreOrderActive
    ? "open"
    : isPreOrderEnded
    ? "closed"
    : "upcoming"
  const airdropState = isAirdropActive
    ? "open"
    : isAirdropEnded
    ? "closed"
    : "upcoming"
  const openSaleState = isOpenSaleActive
    ? "open"
    : isOpenSaleEnded
    ? "closed"
    : "upcoming"
  const texts = TEXTS[locale]

  const { opensea } = env.socialUrls[locale as Lang]

  return (
    <section className={styles.timeline} id="timeline">
      <Container>
        <Section.Title>{texts.title}</Section.Title>

        <section
          className={styles.fade}
          style={{ marginTop: isMediumUp ? "1.5rem" : "0" }}
        >
          <section className={styles.line}>
            <Time state={preOrderState} fade="in" />
          </section>
        </section>

        {/* Pre-order */}
        <section className={styles.time}>
          <section className={styles.line}>
            <Time state={preOrderState} />
          </section>
          <Infobox
            active={isPreOrderActive}
            event={texts.event1}
            content={texts.content1}
            stage1={{
              name: texts.event1_1,
              content: texts.event1_1_content,
            }}
            stage2={{
              name: texts.event1_2,
              content: texts.event1_2_content,
            }}
            button={
              <PreOrderDialog>
                {({ openDialog }) => (
                  <Button
                    disabled={true}
                    color={isPreOrderActive ? "primary" : "black"}
                    width={isMediumUp ? "15rem" : "100%"}
                    spacingY="0.75rem"
                    onClick={() => {
                      analytics("click_button", { type: "pre_order" })
                    }}
                  >
                    {texts.event1_button_sold}
                  </Button>
                )}
              </PreOrderDialog>
            }
          />
        </section>

        {/* airdrops */}
        <section className={styles.time}>
          <section className={styles.line}>
            <Time state={airdropState} />
          </section>
          <Infobox
            active={isAirdropActive}
            event={texts.event2}
            content={texts.content2}
            stage1={{
              name: texts.event2_1,
              content: texts.event2_1_content,
            }}
            stage2={{
              name: texts.event2_2,
              content: texts.event2_2_content,
            }}
            button={
              <AirdriopDialog>
                {({ openDialog }) => (
                  <Button
                    disabled={!isAirdropActive}
                    color={isAirdropActive ? "primary" : "black"}
                    width={isMediumUp ? "15rem" : "100%"}
                    spacingY="0.75rem"
                    onClick={() => {
                      analytics("click_button", { type: "air_drop" })
                      openDialog()
                    }}
                  >
                    {airdropState === "open"
                      ? texts.event2_button_open
                      : airdropState === "closed"
                      ? texts.event2_button_closed
                      : texts.event2_button_upcoming}
                  </Button>
                )}
              </AirdriopDialog>
            }
          />
        </section>

        {/* open sale */}
        <section className={styles.time}>
          <section className={styles.line}>
            <Time state={openSaleState} />
          </section>
          <Infobox
            active={isOpenSaleActive}
            event={texts.event3}
            content={texts.content3}
            stage1={{
              name: texts.event3_1,
              content: texts.event3_1_content,
            }}
            button={
              <Button
                disabled={!isOpenSaleActive}
                color={isOpenSaleActive ? "primary" : "black"}
                width={isMediumUp ? "15rem" : "100%"}
                spacingY="0.75rem"
                htmlHref={isOpenSaleActive && opensea ? opensea : undefined}
                htmlTarget="_blank"
                onClick={() => analytics("click_button", { type: "opensea" })}
              >
                {openSaleState === "open"
                  ? texts.event3_button_open
                  : openSaleState === "closed"
                  ? texts.event3_button_closed
                  : texts.event3_button_upcoming}
              </Button>
            }
          />
        </section>

        {/* logbook */}
        <section className={styles.time}>
          <section className={styles.line}>
            <Time state="upcoming" />
          </section>
          <Infobox
            active={false}
            event={texts.event4}
            content={texts.content4}
            stage1={{
              name: texts.event4_1,
              content: texts.event4_1_content,
            }}
            button={
              <Button
                disabled={true}
                color="black"
                width={isMediumUp ? "15rem" : "100%"}
                spacingY="0.75rem"
                onClick={() => analytics("click_button", { type: "logbooks" })}
              >
                {texts.event4_button_upcoming}
              </Button>
            }
          />
        </section>

        <section className={styles.fade}>
          <section className={styles.line}>
            <Time state="upcoming" fade="out" />
          </section>
        </section>
      </Container>
    </section>
  )
}

export default Timeline
