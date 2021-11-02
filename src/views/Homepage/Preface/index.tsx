import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Container, Section } from "~/components"

import * as styles from "./styles.module.css"
import TEXTS from "./texts"

const Preface = () => {
  const { locale } = useLocalization()
  const texts = TEXTS[locale]

  return (
    <section className={styles.preface}>
      <Container>
        <section className={styles.contents}>
          <Section.Content>
            <p>{texts.content1}</p>
            <p>{texts.content2}</p>
          </Section.Content>
          <div className={styles.aircraft}>
            <img src="/images/aircraft.png" />
          </div>
        </section>
      </Container>
    </section>
  )
}

export default Preface
