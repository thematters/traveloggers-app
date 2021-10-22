import { PageProps } from "gatsby"
import React from "react"

import { SEO } from "~/components"
import Benefits from "~/views/Homepage/Benefits"
import Hero from "~/views/Homepage/Hero"
import Questions from "~/views/Homepage/Questions"

type DataProps = {
  site: {
    buildTime: string
  }
}

const Homepage: React.FC<PageProps<DataProps>> = ({ data, path }) => {
  return (
    <>
      <SEO title="CryptoMatties" />

      <Hero />

      <Benefits />

      <Questions />
    </>
  )
}

export default Homepage
