import React from "react"

import { LogbooksContainer } from "~/components/Logbooks"

import Content from "./Content"
import HeaderBar from "./HeaderBar"

type PageProps = {
  id: string
  originalPath: string
}

const LogbookDetail: React.FC<PageProps> = ({ id, originalPath }) => {
  return (
    <LogbooksContainer headerBar={<HeaderBar tokenId={id} />}>
      <Content tokenId={id} />
    </LogbooksContainer>
  )
}

export default LogbookDetail
