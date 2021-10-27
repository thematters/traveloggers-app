import { PageProps } from "gatsby"
import React from "react"

import Header from "~/components/Layout/Header"
import Acts from "~/views/Story/Acts"

const Story: React.FC<PageProps> = ({
  pageContext: { locale, originalPath }
}) => {
  return (
    <>
      <Header {...{ locale, originalPath }}/>
      <main>
        <Acts />
      </main>
    </>
  )
}

export default Story
