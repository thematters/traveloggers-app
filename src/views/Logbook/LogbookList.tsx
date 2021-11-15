import React from "react"

import { LogbookProvider, SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"

const LogbookList = () => (
  <LogbookProvider>
    <SEO />

    <Header originalPath={"/logbook"} />

    <main style={{ margin: "14rem auto", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Logbook List</h1>
    </main>

    <Footer />
  </LogbookProvider>
)

export default LogbookList
