import { PageProps } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import Benefits from "~/views/Homepage/Benefits"
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
  // const { locale } = useLocalization()

  return (
    <>
      <SEO title="Traveloggers" lang={locale} />

      <Header {...{ locale, originalPath }} />
      <main>
        <Hero />
        <Roadmap />
        <Benefits />
        <Questions />
      </main>

      <Footer {...{ locale, originalPath }} />
    </>
  )
}

export default Homepage
