import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Button, IconScrollDown } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

const Hero = () => {
  const { locale } = useLocalization()

  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,1)), url("/images/hero.jpg")`,
      }}
    >
      <div className="l-container">
        <div className="l-row">
          <div className="l-col-full">
            <div className={styles.content}>
              <h1 className={styles.title}>Traveloggers</h1>

              <h3 className={styles.subtitle}>
                {locale === Lang.en
                  ? "The Matterverse, a revolution orginated from the galaxy, a long expedition to far far away"
                  : "馬特宇宙，來源於銀河宇宙的一次革命，一次離鄉的征途"}
              </h3>

              <p className={styles.intro}>
                {locale === Lang.en
                  ? "Traveloggers is the 1500 NFT avatars issued by Matters that marks a voyager’s journey to Matterverse, which is the identity mark of a voyager to Matterverse. Owners of the avatars will set foot on Matterverse and begin a journey that explores a new world."
                  : "Traveloggers 是 Matters社區發行的 1500 個 NFT 數字头像，代表馬特宇宙的遠航者身份。擁有此身份，將開啟馬特宇宙中最激進的實驗權限。"}
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

      <div className={styles.scrolldown}>
        <IconScrollDown size="xxl" />
        <div>Scroll Down</div>
      </div>
    </section>
  )
}

export default Hero
