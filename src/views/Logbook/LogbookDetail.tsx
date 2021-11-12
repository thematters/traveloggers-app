import React from "react"

import { SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"

import * as styles from "./LogbookList.module.css"

type PageProps = {
  id: string
  originalPath: string
}

const LogbookDetail: React.FC<PageProps> = ({ id, originalPath }) => (
  <>
    <SEO />

    <Header originalPath={originalPath} />
    <main className={styles.main}>
      <h1>Logbook {id}</h1>
      {/* <pre>{JSON.stringify(params)}</pre> */}
    </main>

    <Footer />
  </>
)

export default LogbookDetail
