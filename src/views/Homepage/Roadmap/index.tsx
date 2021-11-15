import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Container, Section } from "~/components"

import * as styles from "./index.module.css"
import Item from "./item"
import TEXTS from "./texts"

const Roadmap = () => {
  const { locale } = useLocalization()
  const texts = TEXTS[locale]

  return (
    <section className={styles.roadmap} id="roadmap">
      <Container>
        <Section.Title>{texts.title}</Section.Title>

        <Item
          content="2021"
          fade="in"
          isYear
          extraStyles={{ paddingTop: "1rem" }}
        />

        <Item content={texts.item1} month={texts.nov} isSubtitle />
        <Item content={texts.content1} />

        <Item content={texts.item2} isSubtitle />
        <Item content={texts.content2} />

        <Item content={texts.item3} isSubtitle />
        <Item content={texts.content3} />

        <Item content={texts.item4} month={texts.dec} isSubtitle />
        <Item content={texts.content4} />

        <Item content="2022" isYear />

        <Item content={texts.item5} month={texts.jan} isSubtitle />
        <Item
          content={
            <p>
              {texts.content5_1}
              <a href="/" target="_blank">
                {texts.content5_2}
              </a>
              {texts.content5_3}
            </p>
          }
        />

        <Item content={texts.item6} month={texts.feb} isSubtitle />
        <Item content={texts.content6} />

        <Item content={texts.item7} isSubtitle />
        <Item content={texts.content7} />

        <Item content={texts.item8} isSubtitle />
        <Item content={texts.content8} />

        <Item content={texts.item9} isSubtitle />
        <Item
          content={
            <>
              <p>{texts.content9}</p>
              <br />
            </>
          }
          fade="out"
        />
      </Container>
    </section>
  )
}

export default Roadmap
