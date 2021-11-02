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
import Timeline from "./timeline"

const Roadmap = () => {
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
    <section className={styles.roadmap} id="roadmap">
      <Container>
        <Section.Title>{texts.title}</Section.Title>

        <section
          className={styles.fade}
          style={{ marginTop: isMediumUp ? "1.5rem" : "0" }}
        >
          <section className={styles.line}>
            <Timeline state={preOrderState} fade="in" />
          </section>
          <section className={styles.timezone}>{texts.timezone}</section>
        </section>

        {/* Pre-order */}
        <section className={styles.time}>
          <section className={styles.line}>
            <Timeline state={preOrderState} />
          </section>
          <Infobox
            active={isPreOrderActive}
            event={texts.event1}
            content={texts.content1}
            stage1={{
              name: texts.event1_1,
              startDate: texts.event1_1_start_date,
              startTime: texts.event1_1_start_time,
              endDate: texts.event1_1_end_date,
              endTime: texts.event1_1_end_time,
            }}
            stage2={{
              name: texts.event1_2,
              startDate: texts.event1_2_start_date,
              startTime: texts.event1_2_start_time,
              endDate: texts.event1_2_end_date,
              endTime: texts.event1_2_end_time,
            }}
            button={
              <PreOrderDialog>
                {({ openDialog }) => (
                  <Button
                    disabled={!isPreOrderActive}
                    color={isPreOrderActive ? "primary" : "black"}
                    width="100%"
                    spacingY="0.75rem"
                    onClick={() => {
                      analytics("click_button", { type: "pre_order" })
                      openDialog()
                    }}
                  >
                    {preOrderState === "upcoming"
                      ? texts.event1_button_upcoming
                      : preOrderState === "closed"
                      ? texts.event1_button_closed
                      : texts.event1_button_open}
                  </Button>
                )}
              </PreOrderDialog>
            }
          />
        </section>

        {/* airdrops */}
        <section className={styles.time}>
          <section className={styles.line}>
            <Timeline state={airdropState} />
          </section>
          <Infobox
            active={isAirdropActive}
            event={texts.event2}
            content={
              <p>
                {texts.content2_1}
                <a
                  href="https://matters.news/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {texts.content2_2}
                </a>
                {texts.content2_3}
              </p>
            }
            stage1={{
              name: texts.event2_1,
              startDate: texts.event2_1_start_date,
              startTime: texts.event2_1_start_time,
              endDate: texts.event2_1_end_date,
              endTime: texts.event2_1_end_time,
            }}
            stage2={{
              name: texts.event2_2,
              startDate: texts.event2_2_start_date,
              startTime: texts.event2_2_start_time,
              endDate: texts.event2_2_end_date,
              endTime: texts.event2_2_end_time,
            }}
            button={
              <AirdriopDialog>
                {({ openDialog }) => (
                  <Button
                    disabled={!isAirdropActive}
                    color={isAirdropActive ? "primary" : "black"}
                    width="100%"
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
            <Timeline state={openSaleState} />
          </section>
          <Infobox
            active={isOpenSaleActive}
            event={texts.event3}
            content={texts.content3}
            stage1={{
              name: texts.event3_1,
              startDate: texts.event3_1_start_date,
              startTime: texts.event3_1_start_time,
            }}
            button={
              <Button
                disabled={!isOpenSaleActive}
                color={isOpenSaleActive ? "primary" : "black"}
                width="100%"
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

        <section className={styles.fade}>
          <section className={styles.line}>
            <Timeline state="upcoming" fade="out" />
          </section>
        </section>
      </Container>
    </section>
  )
}

export default Roadmap
