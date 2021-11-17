import React, { useEffect } from "react"

import env from "@/.env.json"
import { Container, SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import { useResponsive } from "~/hooks"
import { analytics } from "~/utils"

import Content from "./Content"

type PageProps = {
  id: string
  originalPath: string
}

const LogbookDetail: React.FC<PageProps> = ({ id, originalPath }) => {
  const isMediumUp = useResponsive("md-up")

  useEffect(() => {
    import("firebase/app").then(({ initializeApp }) => {
      initializeApp(env.firebase)
      analytics("page_view")
    })
  }, [])

  return (
    <>
      <SEO />

      {isMediumUp && <Header originalPath={originalPath} />}

      <main>
        <Container>
          <Content tokenId={id} />
        </Container>
      </main>

      {isMediumUp && <Footer />}
    </>
  )
}

export default LogbookDetail
