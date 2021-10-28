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
import { useResponsive } from "~/hooks"

import * as Events from "./events"
import * as styles from "./index.module.css"
import Infobox from "./infobox"
import Timeline from "./timeline"

const Roadmap = () => {
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

  return (
    <section className={styles.roadmap} id="roadmap">
      <Container>
        <Section.Title>Roadmap</Section.Title>

        <section
          className={styles.fade}
          style={{ marginTop: isMediumUp ? "1.5rem" : "0" }}
        >
          <section className={styles.line}>
            <Timeline state="ready" fade="in" />
          </section>
        </section>

        <section className={styles.time}>
          <section className={styles.line}>
            <Timeline state="ready" />
          </section>
          <Infobox
            active={isPreOrderActive}
            button={
              <PreOrderDialog>
                {({ openDialog }) => (
                  <Button
                    disabled={!isPreOrderActive}
                    color={isPreOrderActive ? "primary" : "black"}
                    width={isMediumUp ? "12.5rem" : "100%"}
                    spacingY="0.75rem"
                    onClick={openDialog}
                  >
                    {isPreOrderActive ? "參與預售" : "尚未開始"}
                  </Button>
                )}
              </PreOrderDialog>
            }
            {...Events.Event1}
          />
        </section>

        <section className={styles.time}>
          <section className={styles.line}>
            <Timeline state="ready" />
          </section>
          <Infobox
            active={isAirdropActive}
            button={
              <AirdriopDialog>
                {({ openDialog }) => (
                  <Button
                    disabled={!isAirdropActive}
                    color={isAirdropActive ? "primary" : "black"}
                    width={isMediumUp ? "12.5rem" : "100%"}
                    spacingY="0.75rem"
                    onClick={openDialog}
                  >
                    {isAirdropActive ? "參與空頭" : "尚未開始"}
                  </Button>
                )}
              </AirdriopDialog>
            }
            {...Events.Event2}
          />
        </section>

        <section className={styles.time}>
          <section className={styles.line}>
            <Timeline state="ready" />
          </section>
          <Infobox
            active={isOpenSaleActive}
            button={
              <Button
                disabled={!isOpenSaleActive}
                color={isOpenSaleActive ? "primary" : "black"}
                width={isMediumUp ? "12.5rem" : "100%"}
                spacingY="0.75rem"
                htmlHref={isOpenSaleActive ? env.socialUrls.opensea : undefined}
                htmlTarget="_blank"
              >
                {isOpenSaleActive ? "前往查看" : "尚未開始"}
              </Button>
            }
            {...Events.Event3}
          />
        </section>

        <section className={styles.fade}>
          <section className={styles.line}>
            <Timeline state="ready" fade="out" />
          </section>
        </section>
      </Container>
    </section>
  )
}

export default Roadmap
