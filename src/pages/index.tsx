import { graphql, PageProps } from "gatsby"
import * as React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { Viewer } from "../components/Viewer"

type DataProps = {
  site: {
    buildTime: string
  }
}

const UsingTypescript: React.FC<PageProps<DataProps>> = ({ data, path }) => {
  return (
    <Layout>
      <SEO title="Matters NFT" />
      <h1>Matters NFT</h1>
      <p>Matters NFT</p>
      <p>
        You&apos;re currently on the page &quot;{path}&quot; which was built on{" "}
        {data.site.buildTime}.
      </p>
      <Viewer />
    </Layout>
  )
}

export default UsingTypescript

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`
