import React from "react"

import { SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"

const LogbookList = () => (
  <>
    <SEO />

    <Header originalPath={"/logbook"} />
    <main style={{ margin: "14rem auto", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Logbook List</h1>
    </main>
    <Footer />
  </>
)

export default LogbookList
