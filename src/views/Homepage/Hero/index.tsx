import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Button, IconScrollDown, Section, TextIcon } from "~/components"
import { Lang } from "~/enums"
import { analytics } from "~/utils"

import * as styles from "./styles.module.css"

type Props = {
  setStoryActive: (arg0: boolean) => void
}

const Hero: React.FC<Props> = ({ setStoryActive }) => {
  const { locale } = useLocalization()

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
                        ? "Traveloggers is the 1500 NFT avatars issued by Matters Lab to mark the identity of a voyager to Matterverse. Owners of these avatars will have access to the most revolutionary experiments in Matterverse."
                        : "Traveloggers 是 Matters Lab 發行的 1500 個 NFT 數字頭像，代表馬特宇宙的遠航者身份。擁有此身份，將開啟馬特宇宙中最激進的實驗權限。"}
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
                      analytics("click_button", { type: "story_line" })
                      setStoryActive(true)
                    }}
                  >
                    {locale === Lang.en
                      ? "Watch the Prequel Storyline"
                      : "查看前傳故事"}
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
