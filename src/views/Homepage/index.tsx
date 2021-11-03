import classNames from "classnames"
import React, { useEffect, useState } from "react"

import env from "@/.env.json"
import { SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import { analytics } from "~/utils"
import About from "~/views/Homepage/About"
import Benefits from "~/views/Homepage/Benefits"
import CharacterIntro from "~/views/Homepage/CharacterIntro"
import Hero from "~/views/Homepage/Hero"
import Logbook from "~/views/Homepage/Logbook"
import Preface from "~/views/Homepage/Preface"
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

  useEffect(() => {
    import("firebase/app").then(({ initializeApp }) => {
      initializeApp(env.firebase)
      analytics("page_view")
    })
  }, [])

  return (
    <>
      <SEO />

      <Header originalPath={originalPath} />

      <main className={classNames({ [styles.storyActive]: storyActive })}>
        <Acts active={storyActive} setActive={setStoryActive} />
        <Hero />
        <Preface setStoryActive={setStoryActive} />
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

      {!storyActive && <Footer />}
    </>
  )
}

export default Homepage
