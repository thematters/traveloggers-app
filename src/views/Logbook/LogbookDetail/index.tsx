import React, { useEffect } from "react"

import env from "@/.env.json"
import { LogbooksContainer } from "~/components/Logbooks"
import { analytics } from "~/utils"

import Content from "./Content"
import HeaderBar from "./Header"

type PageProps = {
  id: string
  originalPath: string
}

const LogbookDetail: React.FC<PageProps> = ({ id, originalPath }) => {
  useEffect(() => {
    import("firebase/app").then(({ initializeApp }) => {
      initializeApp(env.firebase)
      analytics("page_view")
    })
  }, [])

  return (
    <LogbooksContainer headerBar={<HeaderBar tokenId={id} />}>
      <Content tokenId={id} />
    </LogbooksContainer>
  )
}

export default LogbookDetail
