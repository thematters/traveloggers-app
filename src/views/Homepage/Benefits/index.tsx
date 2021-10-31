import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Container, Section } from "~/components"

import * as styles from "./styles.module.css"
import TEXTS from "./texts"

const Benefits = () => {
  const { locale } = useLocalization()
  const texts = TEXTS[locale]

  return (
    <section className={styles.benefits}>
      <Container>
        <section className={styles.title}>
          <Section.Title>{texts.title}</Section.Title>
        </section>

        <Section.Content>{texts.intro}</Section.Content>

        <section className={styles.item}>
          <Section.Subtitle>{texts.subtitle1}</Section.Subtitle>
          <Section.Content>{texts.content1}</Section.Content>
        </section>

        <section className={styles.item}>
          <Section.Subtitle>{texts.subtitle2}</Section.Subtitle>
          <Section.Content>{texts.content2}</Section.Content>
        </section>

        <section className={styles.item}>
          <Section.Subtitle>{texts.subtitle3}</Section.Subtitle>
          <Section.Content>{texts.content3}</Section.Content>
        </section>

        <section className={styles.item}>
          <Section.Subtitle>{texts.subtitle4}</Section.Subtitle>
          <Section.Content>{texts.content4}</Section.Content>
        </section>
      </Container>
    </section>
  )
}

export default Benefits
