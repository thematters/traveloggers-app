import classNames from "classnames"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext } from "react"

import env from "@/.env.json"
import { Button, Container, RoadmapContext, Section } from "~/components"
import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"
import { analytics } from "~/utils"

import * as styles from "./styles.module.css"

const CharacterIntro = () => {
  const { locale } = useLocalization()
  const isMediumUp = useResponsive("md-up")

  const { isOpenSaleStarted, isOpenSaleEnded } = useContext(RoadmapContext)
  const isOpenSaleActive = isOpenSaleStarted && !isOpenSaleEnded

  const { opensea } = env.socialUrls[locale as Lang]

  return (
    <section>
      <Container>
        <section className={styles.intro}>
          <section className={styles.title}>
            <Section.Title>
              {locale === Lang.en ? "Introducing Characters" : "人物介紹"}
            </Section.Title>
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
              View all on Opensea
            </Button>
          </section>

          <section className={styles.description}>
            <Section.Content>
              <p>
                {locale === Lang.en
                  ? `Traveloggers have six basic characters, namely, Gena, Lesya, Sasha, Valya, Yury, and Zhenya. 1500 avatars were generated based on the combination of different accessories: value position, philosophical standpoint, way of thinking, creative habits, personality, etc. Each Traveloggers is unique with its own creator attributes.`
                  : `Traveloggers 有 6 個基礎人物，分別是  Gena、Lesya、Sasha、Valya、Yury、Zhenya。我們根據創作者的價值取向、哲學主張、思考方式、創作個性等維度，提取關鍵元素組合，創造了 1500 個 Traveloggers 的化身，每一個都獨一無二。`}
              </p>
            </Section.Content>
          </section>
        </section>

        <section className={styles.images}>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char1.png" />
              <p>
                {locale === Lang.en
                  ? "1 Character + 2 Accessories: Birth of Traveloggers"
                  : "一個人物＋兩個配件：Traveloggers 的誕生"}
              </p>
            </div>
          </section>
          <section className={classNames(styles.avatar, styles.empty)}>
            <div></div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char2.png" />
              <p>{locale === Lang.en ? "Sasha" : "Sasha 薩沙"}</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char3.png" />
              <p>{locale === Lang.en ? "Zhenya" : "Zhenya 振亞"}</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char4.png" />
              <p>{locale === Lang.en ? "Valya" : "Valya 瓦拉"}</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char5.png" />
              <p>{locale === Lang.en ? "Gena" : "Gena 根那"}</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char6.png" />
              <p>{locale === Lang.en ? "Lesya" : "Lesya 列峽"}</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char7.png" />
              <p>{locale === Lang.en ? "Yury" : "Yury 尤里"}</p>
            </div>
          </section>
        </section>
      </Container>
    </section>
  )
}

export default CharacterIntro
