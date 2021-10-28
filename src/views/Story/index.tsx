import React from "react"

import Header from "~/components/Layout/Header"
import Acts from "~/views/Story/Acts"

type PageProps = {
  pageContext: {
    originalPath: string
  }
}

const Story: React.FC<PageProps> = ({ pageContext: { originalPath } }) => {
  return (
    <>
      <Header originalPath={originalPath} />
      <main>
        <Acts />
      </main>
    </>
  )
}

export default Story
