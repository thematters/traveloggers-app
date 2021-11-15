import React from "react"

import { Container, LogbookEditor, LogbookProvider, SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"

// import * as styles from "./LogbookList.module.css"

type PageProps = {
  id: string
  originalPath: string
}

const LogbookDetail: React.FC<PageProps> = ({ id, originalPath }) => {
  return (
    <LogbookProvider>
      <SEO />

      <Header originalPath={originalPath} />

      <main style={{ margin: "10rem auto", minHeight: "100vh" }}>
        <h1 style={{ textAlign: "center" }}>Logbook {id}</h1>

        <Container>
          <LogbookEditor tokenId={id} />
        </Container>
      </main>

      <Footer />
    </LogbookProvider>
  )
}

export default LogbookDetail
