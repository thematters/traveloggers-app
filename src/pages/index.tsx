// If you don't want to use TypeScript you can delete this file!
import * as React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Viewer } from "../components/Viewer"

type DataProps = {
  site: {
    buildTime: string
  }
}

const UsingTypescript: React.FC<PageProps<DataProps>> = ({ data, path }) => {
  return (
    <Layout>
      <Seo title="Matters NFT" />
      <h1>Matters NFT</h1>
      <p>Matters NFT</p>
      <p>
        You're currently on the page "{path}" which was built on{" "}
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
