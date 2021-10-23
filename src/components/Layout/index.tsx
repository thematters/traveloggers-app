import "~/styles/defaults.css"
import "~/styles/reset.css"
import "~/styles/layouts.css"

import { ClientContext, GraphQLClient } from "graphql-hooks"
import React from "react"

const client = new GraphQLClient({
  url: "https://server-develop.matters.news/graphql",
  useGETForQueries: false,
  ssrMode: false,
  fetchOptions: {
    credentials: "include",
  },
})

const Layout: React.FC = ({ children, props }) => {
  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  )
}

export default Layout
