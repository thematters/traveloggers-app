import React from "react"

import { Button, Container, Section } from "~/components"
import { useResponsive } from "~/hooks"

import * as Events from "./events"
import * as styles from "./index.module.css"
import Infobox from "./infobox"
import Timeline from "./timeline"

const Roadmap = () => {
  const isMediumUp = useResponsive("md-up")
  const isPreorderActive = false
  const isAirdropActive = false
  const isOpenSaleActive = false

  return (
    <section className={styles.roadmap}>
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
            active={isPreorderActive}
            button={
              <Button
                disabled={!isPreorderActive}
                color={isPreorderActive ? "primary" : "black"}
                width={isMediumUp ? "12.5rem" : "100%"}
                spacingY="0.75rem"
              >
                尚未開始
              </Button>
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
              <Button
                disabled={!isAirdropActive}
                color={isPreorderActive ? "primary" : "black"}
                width={isMediumUp ? "12.5rem" : "100%"}
                spacingY="0.75rem"
              >
                尚未開始
              </Button>
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
              >
                尚未開始
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
