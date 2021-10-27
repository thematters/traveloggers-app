import classNames from "classnames"
import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Button, Container, Section } from "~/components"
import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"

import * as styles from "./styles.module.css"

const CharacterIntro = () => {
  const { locale } = useLocalization()
  const isMediumUp = useResponsive("md-up")

  return (
    <section className={styles.intro}>
      <Container>
        <section className={styles.intro}>
          <section className={styles.title}>
            <Section.Title>
              {locale === Lang.en ? "Character Introduction" : "人物介紹"}
            </Section.Title>
          </section>

          <section className={styles.button}>
            <Button
              color="primary"
              width={isMediumUp ? "12.5rem" : "100%"}
              spacingY="0.75rem"
              htmlHref="https://opensea.io"
              htmlTarget="_blank"
            >
              View all on Opensea
            </Button>
          </section>

          <section className={styles.description}>
            <Section.Content>
              <p>
                我們為遠航者創造了6個基礎人物，分別是
                Sasha（薩沙）、Zhenya（振亞）、Valya（瓦拉）、Gena（根那）、Lesya（列峽）、Yury（尤里）。同時我們根據創作者的價值取向，哲學主張，創作者的創作氣質，思考方式，創作者的創作習慣和個性等6個維度，提取關鍵詞進行設計，
                生成了xxx個CryptoMatties。每一個 CryptoMatties
                都有專屬的創作者屬性，都是獨一無二的。
              </p>
            </Section.Content>
          </section>
        </section>

        <section className={styles.images}>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char1.png" />
              <p>一個人物＋兩個配件：Matties 的誕生</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char2.png" />
              <p>Sasha 薩沙</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char3.png" />
              <p>Zhenya 振亞</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char4.png" />
              <p>Valya 瓦拉</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char5.png" />
              <p>Gena 根那</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char6.png" />
              <p>Lesya 列峽</p>
            </div>
          </section>
          <section className={styles.avatar}>
            <div>
              <img src="/images/char7.png" />
              <p>Yury 尤里</p>
            </div>
          </section>
        </section>
      </Container>
    </section>
  )
}

export default CharacterIntro
