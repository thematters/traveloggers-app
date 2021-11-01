import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Container, Expandable, Section } from "~/components"

import * as styles from "./styles.module.css"
import TEXTS from "./texts"

const link4 =
  "https://matters.news/@penfarming/%E9%96%B1%E8%AE%80%E7%AD%86%E8%80%95-%E7%82%BA%E9%A6%AC%E7%89%B9%E5%B8%82" +
  "-nft-%E8%A8%88%E7%95%AB%E5%81%9A%E6%BA%96%E5%82%99-02-meta-mask-%E5%B0%8F%E7%8B%90%E7%8B%B8%E9%8C%A2%E5%8C%85-" +
  "bafyreih6hktykp5bzxlp373aph5ck3wvyoba4z6ex4s5ccoelirqxqiyva"

const Questions = () => {
  const { locale } = useLocalization()
  const texts = TEXTS[locale]

  const expandableStyles = {
    customStyles: { paddingTop: "1rem" },
  }

  return (
    <section className={styles.questions}>
      <Container>
        <Section.Title>FAQ</Section.Title>

        <Expandable
          customStyles={{ paddingTop: "1.5rem" }}
          title={texts.question1}
          content={
            <>
              <p>{texts.answer1_1}</p>
              <br />
              <p>{texts.answer1_2}</p>
            </>
          }
        />
        <Expandable
          {...expandableStyles}
          title={texts.question2}
          content={<p>{texts.answer2}</p>}
        />
        <Expandable
          {...expandableStyles}
          title={texts.question3}
          content={<p>{texts.answer3}</p>}
        />
        <Expandable
          {...expandableStyles}
          title={texts.question4}
          content={
            <p>
              {texts.answer4_1}
              <a href={link4} target="_blank" rel="noreferrer">
                {texts.answer4_2}
              </a>
              {texts.answer4_3}
            </p>
          }
        />
        <Expandable
          {...expandableStyles}
          title={texts.question5}
          content={
            <>
              <p>{texts.answer5_1}</p>
              <br />
              <p>{texts.answer5_2}</p>
            </>
          }
        />
        <Expandable
          {...expandableStyles}
          title={texts.question6}
          content={
            <>
              <p>{texts.answer6_1}</p>
              <br />
              <p>{texts.answer6_2}</p>
              <br />
              {/*
              <a href="" target="_blank" rel="noreferrer">
                {texts.answer6_3}
              </a>
              */}
            </>
          }
        />
        {/*
        <Expandable {...expandableStyles}
          title={texts.question7}
          content={(<a>{texts.answer7}</a>)}
        />
        */}
        <Expandable
          {...expandableStyles}
          title={texts.question8}
          content={<p>{texts.answer8}</p>}
        />
      </Container>
    </section>
  )
}

export default Questions
