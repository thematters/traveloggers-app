import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext } from "react"

import env from "@/.env.json"
import { Button, Container, RoadmapContext, Section } from "~/components"
import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"
import { analytics } from "~/utils"

import * as styles from "./index.module.css"
import Selector from "./selector"
import TEXTS from "./texts"

const CharacterIntro = () => {
  const { locale } = useLocalization()
  const isMediumUp = useResponsive("md-up")

  const { isOpenSaleStarted, isOpenSaleEnded } = useContext(RoadmapContext)
  const isOpenSaleActive = isOpenSaleStarted && !isOpenSaleEnded

  const { opensea } = env.socialUrls[locale as Lang]
  const texts = TEXTS[locale]

  return (
    <section>
      <Container>
        <section className={styles.intro}>
          <section className={styles.title}>
            <Section.Title>{texts.title}</Section.Title>
          </section>

          <section className={styles.button}>
            <Button
              disabled={!isOpenSaleActive}
              color="primary"
              width={isMediumUp ? "12.5rem" : "100%"}
              spacingY="0.75rem"
              htmlHref={isOpenSaleActive && opensea ? opensea : undefined}
              htmlTarget="_blank"
              onClick={() => analytics("click_button", { type: "opensea" })}
            >
              {texts.toOpensea}
            </Button>
          </section>

          <section className={styles.description}>
            <Section.Content>
              <p>{texts.intro}</p>
            </Section.Content>
          </section>
        </section>

        <section className={styles.base}>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char2.png" />
              <p>{texts.sasha}</p>
            </div>
          </section>

          <section className={styles.avatar}>
            <div>
              <img src="/images/char3.png" />
              <p>{texts.valya}</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char4.png" />
              <p>{texts.zhenya}</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char5.png" />
              <p>{texts.gena}</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char6.png" />
              <p>{texts.lesya}</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char7.png" />
              <p>{texts.yury}</p>
            </div>
          </section>
        </section>

        <section className={styles.gallery}>
          <section className={styles.item}>
            <div>
              <img src="/images/char1.gif" />
              <p>{texts.example}</p>
            </div>
          </section>
          <section className={styles.item}>
            <Selector />
          </section>
        </section>
      </Container>
    </section>
  )
}

export default CharacterIntro
