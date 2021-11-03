import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import env from "@/.env.json"
import { Button, IconScrollDown, Section, TextIcon } from "~/components"
import { Lang } from "~/enums"
import { analytics } from "~/utils"

import * as styles from "./styles.module.css"

type Props = {
  setStoryActive: (arg0: boolean) => void
}

const Hero: React.FC<Props> = ({ setStoryActive }) => {
  const { locale } = useLocalization()
  const { discord } = env.socialUrls[locale as Lang]

  return (
    <>
      <section className={styles.hero}>
        <div className="l-container">
          <div className="l-row">
            <div className="l-col-full">
              <div className={styles.content}>
                <h1 className={styles.title}>Traveloggers</h1>

                <h3 className={styles.subtitle}>
                  {locale === Lang.en
                    ? "Far away in the Galaxy, a revolution led to a journey away from home. The Matterverse was born."
                    : "馬特宇宙，來源於銀河宇宙的一次革命，一次離鄉的征途"}
                </h3>

                <section className={styles.intro}>
                  <Section.Content>
                    <p>
                      {locale === Lang.en
                        ? "Traveloggers, with 1,500 digital avatars issued by Matters Lab, expand private ownership with collective creation by allowing each successive owner of the NFT to record a message. Owners of these avatars will have access to the most revolutionary experiments in Matterverse."
                        : "Traveloggers 是 Matters Lab 發行的 1500 個 NFT 數字頭像，是一種可交互、可拓展的社交共創型 NFT。擁有此身份，將開啟馬特宇宙中最激進的實驗權限。"}
                    </p>
                  </Section.Content>
                </section>
                <section className={styles.cta}>
                  <Button
                    color="primary"
                    width="100%"
                    height="3.5rem"
                    spacingY="1rem"
                    onClick={() => {
                      analytics("click_button", { type: "pre_order" })
                    }}
                  >
                    {locale === Lang.en
                      ? "Pre-orders Open on November 5"
                      : "11/5 開啟預購"}
                  </Button>
                  <Button
                    color="primary"
                    width="100%"
                    height="3.5rem"
                    spacingY="1rem"
                    onClick={() => {
                      analytics("click_button", { type: "hero_dis" })
                    }}
                    htmlHref={discord}
                    htmlTarget="_blank"
                    rel="noreferrer"
                  >
                    {locale === Lang.en ? "Join Discord" : "加入 Discord 討論"}
                  </Button>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.scrolldown}>
          <TextIcon
            icon={<IconScrollDown />}
            textPlacement="bottom"
            spacing="loose"
          >
            Scroll Down
          </TextIcon>
        </div>
      </section>

      <div className={styles.extra}></div>
    </>
  )
}

export default Hero
