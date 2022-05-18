import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import env from "@/.env.json"
import { Container, Expandable, Section } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"
import TEXTS from "./texts"

const link4 =
  "https://matters.news/@penfarming/%E9%96%B1%E8%AE%80%E7%AD%86%E8%80%95-%E7%82%BA%E9%A6%AC%E7%89%B9%E5%B8%82" +
  "-nft-%E8%A8%88%E7%95%AB%E5%81%9A%E6%BA%96%E5%82%99-02-meta-mask-%E5%B0%8F%E7%8B%90%E7%8B%B8%E9%8C%A2%E5%8C%85-" +
  "bafyreih6hktykp5bzxlp373aph5ck3wvyoba4z6ex4s5ccoelirqxqiyva"

const link5 =
  "https://matters.news/@hi176/nft-%E9%A0%90%E8%B3%BC%E6%8C%87%E5%8D%97-%E8%B7%9F%E8%91%97%E6%AD%A5%E9%A" +
  "9%9F%E8%B5%B0-%E8%BC%95%E9%AC%86%E5%AE%8C%E6%88%90-traveloggers-%E9%A0" +
  "%90%E8%B3%BC-bafyreihehkggyk43tz5t2ffzwpm2ffyzsj4jicqaoay4ufxbkwo6xdk4dq"

const link6 =
  "https://matters.news/@hi176/nft-%E7%99%BB%E8%A8%98%E7%A9%BA%E6%8A%95-%E5%A6%82%E4%BD%95%E7%8D%B2%E5%B" +
  "E%97-traveloggers-%E7%A9%BA%E6%8A%95-%E5%BF%AB%E4%BE%86%E7%B6%81%E5%AE%9A%E" +
  "9%8C%A2%E5%8C%85-bafyreigvypuhddpehillleaw73tzupcklixpw3raj5kfz5227p57v2rvpq"

const link7En =
  "https://support.opensea.io/hc/en-us/sections/1500000462261-Buying"

const link7Zh =
  "https://matters.news/@hi176/%E6%8C%87%E5%8D%97-traveloggers-%E5%8D%B3%E5%B0%87%E5%9C%A8-open-sea-%E4%B" +
  "8%8A%E7%B7%9A-%E5%A6%82%E4%BD%95%E8%B3%BC%E8%B2%B7%E5%91%A2-bafyreibcpfyjxcl" +
  "tz3ffelwkunuzocctdgczvwptlvdnudr3ijvmmrarou"

const link9Zh =
  "https://matters.news/@Matterslab/%E8%88%AA%E8%A1%8C%E6%97%A5%E8%AA%8C-logbook-%E4%BD%BF%E7%94%A8%E6%8C%87" +
  "%E5%8D%97-%E5%A6%82%E4%BD%95%E5%9C%A8%E4%BD%A0%E7%9A%84-traveloggers-%E5%AF%AB%E4%B8%8B%E6%96%87%E5%AD%97%E8" +
  "%A8%8A%E6%81%AF-bafyreig7dh6oa7uqki57kmjyd2miwjj4jcer6jo6txsmeqf7pav54yvpwu"

const link9En =
  "https://matters.news/@Matterslab/guideline-for-traveloggers-how-to-use-your-logbook-bafyreigbzmnmjoqsgtiok" +
  "nmtcu4nosmk3uwdn7sm4j2zcxcvaypabqvg2m"

const Questions = () => {
  const { locale } = useLocalization()
  const texts = TEXTS[locale]
  const logbookUrl = env.logbookUrl

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
            <Section.Content>
              <p>{texts.answer1_1}</p>
              <p>{texts.answer1_2}</p>
            </Section.Content>
          }
        />
        <Expandable
          {...expandableStyles}
          title={texts.question2}
          content={
            <Section.Content>
              <p>{texts.answer2}</p>
            </Section.Content>
          }
        />
        <Expandable
          {...expandableStyles}
          title={texts.question3}
          content={
            <Section.Content>
              <p>{texts.answer3}</p>
            </Section.Content>
          }
        />
        <Expandable
          {...expandableStyles}
          title={texts.question4}
          content={
            <Section.Content>
              <p>
                {texts.answer4_1}
                <a href={link4} target="_blank" rel="noreferrer">
                  {texts.answer4_2}
                </a>
                {texts.answer4_3}
              </p>
            </Section.Content>
          }
        />
        <Expandable
          {...expandableStyles}
          title={texts.question5}
          content={
            <Section.Content>
              <p>{texts.answer5_1}</p>
              <p>{texts.answer5_2}</p>
              {texts.answer5_3 && (
                <p>
                  <a href={link5} target="_blank" rel="noreferrer">
                    {texts.answer5_3}
                  </a>
                </p>
              )}
            </Section.Content>
          }
        />
        <Expandable
          {...expandableStyles}
          title={texts.question6}
          content={
            <Section.Content>
              <p>{texts.answer6_1}</p>
              <p>{texts.answer6_2}</p>
              {texts.answer6_3 && (
                <p>
                  <a href={link6} target="_blank" rel="noreferrer">
                    {texts.answer6_3}
                  </a>
                </p>
              )}
            </Section.Content>
          }
        />
        <Expandable
          {...expandableStyles}
          title={texts.question7}
          content={
            <Section.Content>
              <p>
                {texts.answer7_1}
                <a
                  href={locale === Lang.en ? link7En : link7Zh}
                  target="_blank"
                  rel="noreferrer"
                >
                  {texts.answer7_2}
                </a>
              </p>
            </Section.Content>
          }
        />
        <Expandable
          {...expandableStyles}
          title={texts.question8}
          content={
            <Section.Content>
              <p>{texts.answer8}</p>
            </Section.Content>
          }
        />
        <Expandable
          {...expandableStyles}
          title={texts.question9}
          content={
            <Section.Content>
              <p>
                {texts.answer9_5}
                <a href={logbookUrl} target="_blank" rel="noreferrer">
                  {texts.answer9_6}
                </a>
              </p>
              <p>
                {texts.answer9_7}
                <a href="https://matters.news/@Matterslab/a-guide-to-logbook-2-0-how-to-use-logbook-bafyreih5uquigwdzha5xlwg5e76kn7bqekgx274u7jyhoxe3bhynyho2he" target="_blank" rel="noreferrer">
                  {texts.answer9_8}
                </a>
              </p>
              <br />
              <p>{texts.answer9_1}</p>
              <p>{texts.answer9_2}</p>
              <p>{texts.answer9_3}</p>
              <p>
                <a
                  href={locale === Lang.en ? link9En : link9Zh}
                  target="_blank"
                  rel="noreferrer"
                >
                  {texts.answer9_4}
                </a>
              </p>
            </Section.Content>
          }
        />
        <Expandable
          {...expandableStyles}
          title={texts.question10}
          content={
            <Section.Content>
              <p>{texts.answer10_1}</p>
            </Section.Content>
          }
        />
      </Container>
    </section>
  )
}

export default Questions
