// import "./style.css"

import { graphql, useStaticQuery } from "gatsby"
import { ClientContext, GraphQLClient } from "graphql-hooks"
import * as React from "react"

import Header from "../Header"

const client = new GraphQLClient({
  url: "https://server-develop.matters.news/graphql",
  useGETForQueries: false,
  ssrMode: false,
  fetchOptions: {
    credentials: "include",
  },
})

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ClientContext.Provider value={client}>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </ClientContext.Provider>
  )
}

export default Layout
