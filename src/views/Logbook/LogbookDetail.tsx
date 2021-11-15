import React from "react"

import { Container, LogbookEditor, SEO } from "~/components"
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
      <Container>
        <LogbookEditor tokenId={id} />
      </Container>
    </main>

    <Footer />
  </>
)

export default LogbookDetail
