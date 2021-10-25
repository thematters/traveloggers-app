import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Button } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

const Hero = () => {
  const { locale } = useLocalization()

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(/images/hero.jpg)` }}
    >
      <div className="l-container">
        <div className="l-row">
          <div className="l-col-full">
            <div className={styles.content}>
              <h1 className={styles.title}>CryptoMatties</h1>

              <h3 className={styles.subtitle}>
                {locale === Lang.en
                  ? "The Matterverse, a revolution orginated from the galaxy, a long expedition to far far away"
                  : locale === Lang.zhHans
                  ? "马特宇宙，来源于银河宇宙的一次革命，一次离乡的征途"
                  : "馬特宇宙，來源於銀河宇宙的一次革命，一次離鄉的征途"}
              </h3>

              <p className={styles.intro}>
                {locale === Lang.zhHans
                  ? "CryptoMatties 是 Matters 发行的通向马特宇宙的 1500 个远航者 NFT Avatar，是马特宇宙的远航者标志。 Avatar 的拥有者将会踏上马特宇宙，开始新世界的探索征途。"
                  : "CryptoMatties 是 Matters 發行的通向馬特宇宙的 1500 個遠航者 NFT Avatar，是馬特宇宙的遠航者標誌。 Avatar 的擁有者將會踏上馬特宇宙，開始新世界的探索征途。"}
              </p>

              <section className={styles.cta}>
                <Button
                  color="primary"
                  width="100%"
                  height="3.5rem"
                  spacingY="1rem"
                >
                  {locale === Lang.en
                    ? "Watch the Prequel Storyline"
                    : locale === Lang.zhHans
                    ? "查看前传故事"
                    : "查看前傳故事"}
                </Button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
