import React from "react"

import { Button, Container, IconLogoText, Section } from "~/components"
import { useResponsive } from "~/hooks"

import * as styles from "./styles.module.css"

const About = () => {
  const isMediumUp = useResponsive("md-up")

  return (
    <section className={styles.container}>
      <Container>
        <Section.Title>團隊介紹</Section.Title>
        <section className={styles.about}>
          <section className={styles.intro}>
            <Section.Content>
              Matters 致力搭建基於 IPFS
              的去中心化的內容存儲及分發系統，令創作不受制於任何平台，獨立性得到保障。同時，與
              LikeCoin 基金會聯手，將 LikeCoin
              這一以寫作者創造力為衡量的加密貨幣，以收入的形式回饋給作者。
            </Section.Content>

            <section className={styles.button}>
              <Button
                color="primary"
                width={isMediumUp ? "11rem" : "100%"}
                spacingY="0.75rem"
              >
                Matters 長什麼樣
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
