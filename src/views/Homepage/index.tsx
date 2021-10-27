import classNames from "classnames"
import React, { useState } from "react"

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

import Acts from "./Acts"
import * as styles from "./styles.module.css"

type PageProps = {
  pageContext: {
    originalPath: string
  }
}

const Homepage: React.FC<PageProps> = ({ pageContext: { originalPath } }) => {
  const [storyActive, setStoryActive] = useState<boolean>(false)

  return (
    <>
      <SEO />

      <Header originalPath={originalPath} />

      <main className={classNames({ [styles.storyActive]: storyActive })}>
        <Acts active={storyActive} setActive={setStoryActive} />
        <Hero setStoryActive={setStoryActive} />
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
