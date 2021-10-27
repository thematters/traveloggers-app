import { PageProps } from "gatsby"
import React from "react"

import Header from "~/components/Layout/Header"

const Story: React.FC<PageProps> = ({
  pageContext: { locale, originalPath }
}) => {
  return (
    <>
      <Header {...{ locale, originalPath }}/>
    </>
  )
}

export default Story
