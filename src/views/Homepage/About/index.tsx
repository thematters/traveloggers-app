import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Button, Container, IconLogoText, Section } from "~/components"
import { useResponsive } from "~/hooks"

import * as styles from "./styles.module.css"
import TEXTS from "./texts"

const About = () => {
  const isMediumUp = useResponsive("md-up")
  const { locale } = useLocalization()
  const texts = TEXTS[locale]

  return (
    <section className={styles.container}>
      <Container>
        <Section.Title>{texts.title}</Section.Title>
        <section className={styles.about}>
          <section className={styles.intro}>
            <Section.Content>{texts.content}</Section.Content>

            <section className={styles.button}>
              <Button
                color="primary"
                width={isMediumUp ? "11rem" : "100%"}
                spacingY="0.75rem"
              >
                {texts.button}
              </Button>
            </section>
          </section>
          <section className={styles.logo}>
            <IconLogoText />
          </section>
        </section>
      </Container>
    </section>
  )
}

export default About
