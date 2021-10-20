import { PageProps } from "gatsby"
import React from "react"

import { SEO } from "~/components"
import Hero from "~/views/Homepage/Hero"

type DataProps = {
  site: {
    buildTime: string
  }
}

const Homepage: React.FC<PageProps<DataProps>> = ({ data, path }) => {
  return (
    <>
      <SEO title="Travelogers" />

      <Hero />
    </>
  )
}

export default Homepage