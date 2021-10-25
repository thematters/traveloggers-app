import { PageProps } from "gatsby"
import React from "react"

import { SEO } from "~/components"
import Benefits from "~/views/Homepage/Benefits"
import CharacterIntro from "~/views/Homepage/CharacterIntro"
import Hero from "~/views/Homepage/Hero"
import Questions from "~/views/Homepage/Questions"
import Roadmap from "~/views/Homepage/Roadmap"

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
      <CharacterIntro />
      <Benefits />
      <Questions />
    </>
  )
}

export default Homepage
