import { PageProps } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import Hero from "~/views/Homepage/Hero"

type DataProps = {
  site: {
    buildTime: string
  }
}

const Homepage: React.FC<PageProps<DataProps>> = ({ data, path }) => {
  const { locale } = useLocalization()
  return (
    <>
      <SEO title="CryptoMatties" lang={locale} />

      <Header />
      <main>
        <Hero />
      </main>

      <Footer />
    </>
  )
}

export default Homepage
