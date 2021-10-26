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

  const containerClasses = classNames({
    [styles.charintro]: true,
    [styles.charintro_md_up]: isMediumUp,
  })

  return (
    <section className={containerClasses}>
      <Container>
        <Section.Title>
          {locale === Lang.en ? "Character Introduction" : "人物介紹"}
        </Section.Title>
        <div
          className={classNames({
            [styles.content]: true,
            [styles.content_md_up]: true,
          })}
        >
          <div>
            <Section.Content>
              {locale === Lang.en
                ? "We have created 6 basic characters for voyagers, namely, xxx, xxx, xxx, xxx, xxx, xxx. Meanwhile, we have generated xxx(number) Traveloggers with character designs based on value orientation, philosophical proposition, creative temperament, way of thinking, creative habits, and personality. Each Traveloggers is unique with its own creator attributes. "
                : locale === Lang.zhHans
                ? "我们为Traveloggers创造了6个基础人物，分别是xxx, xxx, xxx, xxx, xxx, xxx。同时我们根据创作者的价值取向，哲学主张，创作者的创作气质，思考方式，创作者的创作习惯和个性等6个维度，提取关键词进行设计， 生成了xxx个 Traveloggers。每一个 Traveloggers 都有专属的创作者属性，都是独一无二的。"
                : "我們為Traveloggers創造了6個基礎人物，分別是xxx, xxx, xxx, xxx, xxx, xxx。同時我們根據創作者的價值取向，哲學主張，創作者的創作氣質，思考方式，創作者的創作習慣和個性等6個維度，提取關鍵詞進行設計， 生成了xxx個 Traveloggers。每一個 Traveloggers 都有專屬的創作者屬性，都是獨一無二的。"}
            </Section.Content>
          </div>
          <div className={styles.button_center}>
            <Button
              color="primary"
              height="2.5rem"
              spacingY="1rem"
              spacingX="2rem"
            >
              View all on Opensea
            </Button>
          </div>
        </div>

        <div
          className={classNames({
            [styles.group_chars]: true,
            // [styles.group_chars_md_up]: isMediumUp,
          })}
        >
          <div className={styles.group1}>
            <div>
              <div className={styles.frame}>
                <img src="/images/char1.png" />
              </div>
              <div>
                <span>一個人物＋兩個配件：Matties 的誕生</span>
              </div>
            </div>
          </div>
          <div className={styles.group2}>
            <div>
              <div className={styles.frame}>
                <img src="/images/char2.png" />
              </div>
              <span>Sasha 薩沙</span>
            </div>
            <div>
              <div className={styles.frame}>
                <img src="/images/char3.png" />
              </div>
              <span>Zhenya 振亞</span>
            </div>
            <div>
              <div className={styles.frame}>
                <img src="/images/char4.png" />
              </div>
              <span>Valya 瓦拉</span>
            </div>
            <div>
              <div className={styles.frame}>
                <img src="/images/char5.png" />
              </div>
              <span>Gena 根那</span>
            </div>
            <div>
              <div className={styles.frame}>
                <img src="/images/char6.png" />
              </div>
              <span>Lesya 列峽</span>
            </div>
            <div>
              <div className={styles.frame}>
                <img src="/images/char7.png" />
              </div>
              <span>Yury 尤里</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CharacterIntro
