import { PageProps } from "gatsby"
import React from "react"

import { SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import Benefits from "~/views/Homepage/Benefits"
import CharacterIntro from "~/views/Homepage/CharacterIntro"
import Hero from "~/views/Homepage/Hero"
import Logbook from "~/views/Homepage/Logbook"
import Questions from "~/views/Homepage/Questions"
import Roadmap from "~/views/Homepage/Roadmap"
import ScrollDown from "~/views/Homepage/ScrollDown"

type DataProps = {
  site: {
    buildTime: string
  }
}

const Homepage: React.FC<PageProps<DataProps>> = ({
  pageContext: { locale, originalPath },
}) => {
  return (
    <>
      <SEO title="CryptoMatties" lang={locale} />

      <Header {...{ locale, originalPath }} />

      <main>
        <Hero />
        <Logbook />
        <Roadmap />
        <ScrollDown />
        <CharacterIntro />
        <ScrollDown />
        <Benefits />
        <ScrollDown />
        <Questions />
      </main>

      <Footer {...{ locale, originalPath }} />
    </>
  )
}

export default Homepage
