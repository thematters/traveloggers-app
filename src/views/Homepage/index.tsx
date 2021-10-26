import { PageProps } from "gatsby"
import React from "react"

import { SEO } from "~/components"
import About from "~/views/Homepage/About"
import Benefits from "~/views/Homepage/Benefits"
import CharacterIntro from "~/views/Homepage/CharacterIntro"
import Hero from "~/views/Homepage/Hero"
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

      <Hero />
      <Roadmap />
      <ScrollDown />
      <CharacterIntro />
      <ScrollDown />
      <Benefits />
      <ScrollDown />
      <Questions />
      <ScrollDown />
      <About />
    </>
  )
}

export default Homepage
