import React from "react"

import { SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import About from "~/views/Homepage/About"
import Benefits from "~/views/Homepage/Benefits"
import CharacterIntro from "~/views/Homepage/CharacterIntro"
import Hero from "~/views/Homepage/Hero"
import Logbook from "~/views/Homepage/Logbook"
import Questions from "~/views/Homepage/Questions"
import Roadmap from "~/views/Homepage/Roadmap"
import ScrollDown from "~/views/Homepage/ScrollDown"

type PageProps = {
  pageContext: {
    originalPath: string
  }
}

const Homepage: React.FC<PageProps> = ({ pageContext: { originalPath } }) => {
  return (
    <>
      <SEO />

      <Header originalPath={originalPath} />

      <main>
        <Hero />
        <Logbook />
        <ScrollDown />
        <Roadmap />
        <ScrollDown />
        <CharacterIntro />
        <ScrollDown />
        <Benefits />
        <ScrollDown />
        <Questions />
        <ScrollDown />
        <About />
      </main>

      <Footer />
    </>
  )
}

export default Homepage
