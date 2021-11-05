import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Button, Container, Section } from "~/components"
import { Lang } from "~/enums"
import { analytics } from "~/utils"

import * as styles from "./styles.module.css"
import TEXTS from "./texts"

type Props = {
  setStoryActive: (arg0: boolean) => void
}

const Preface: React.FC<Props> = ({ setStoryActive }) => {
  const { locale } = useLocalization()
  const texts = TEXTS[locale]

  return (
    <section className={styles.preface}>
      <Container>
        <section className={styles.contents}>
          <div>
            <Section.Content>
              <p>{texts.content1}</p>
              <p>{texts.content2}</p>
            </Section.Content>
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
                {locale === Lang.en ? "The Prequel" : "查看前傳故事"}
              </Button>
            </section>
          </div>

          <div className={styles.aircraft}>
            <img src="/images/aircraft_soldout.gif" />
          </div>
        </section>
      </Container>
    </section>
  )
}

export default Preface
