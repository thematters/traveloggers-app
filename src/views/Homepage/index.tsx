import { PageProps } from "gatsby"
import React from "react"

import { SEO } from "~/components"
import Benefits from "~/views/Homepage/Benefits"
import Hero from "~/views/Homepage/Hero"
import Logbook from "~/views/Homepage/Logbook"
import Questions from "~/views/Homepage/Questions"
import Roadmap from "~/views/Homepage/Roadmap"

const Homepage: React.FC<PageProps> = () => {
  return (
    <>
      <SEO />

      <Hero />
      <Logbook />
      <Roadmap />
      <Benefits />
      <Questions />
    </>
  )
}

export default Homepage
