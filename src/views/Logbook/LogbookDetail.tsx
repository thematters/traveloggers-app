import React from "react"

import { LogbookProvider, SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"

import * as styles from "./LogbookDetail.module.css"

type PageProps = {
  id: string
  originalPath: string
}

const LogbookDetail: React.FC<PageProps> = ({ id, originalPath }) => {
  return (
    <LogbookProvider>
      <SEO />

      <Header originalPath={originalPath} />

      <main className={styles.main}>
        <h1>Logbook {id}</h1>
      </main>

      <Footer />
    </LogbookProvider>
  )
}

export default LogbookDetail
