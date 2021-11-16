import React, { useContext, useEffect } from "react"

import { Container, LogbookContext, LogbookEditor, SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"

// import * as styles from "./LogbookList.module.css"

type PageProps = {
  id: string
  originalPath: string
}

const LogbookDetail: React.FC<PageProps> = ({ id, originalPath }) => {
  const { getLogbook, logbooks } = useContext(LogbookContext)

  const logbook = logbooks[id]
  useEffect(() => {
    if (logbook) {
      return
    }
    getLogbook(id)
  }, [logbook])

  // if (!account) {
  //   return <h2>Please sign in first</h2>
  // }

  if (!logbook) {
    return <h2>Logbook does not exist</h2>
  }

  return (
    <>
      <SEO />

      <Header originalPath={originalPath} />

      <main style={{ margin: "10rem auto", minHeight: "100vh" }}>
        <h1 style={{ textAlign: "center" }}>Logbook {id}</h1>

        <Container>
          {/* {logbook?.loading && <Spinner />} */}
          {logbook && <LogbookEditor logbook={logbook} />}
        </Container>
      </main>

      <Footer />
    </>
  )
}

export default LogbookDetail
