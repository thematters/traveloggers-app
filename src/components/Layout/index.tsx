import "~/styles/defaults.css"
import "~/styles/reset.css"
import "~/styles/layouts.css"

import { ClientContext, GraphQLClient } from "graphql-hooks"
import React from "react"

import Footer from "./Footer"
import Header from "./Header"

const client = new GraphQLClient({
  url: "https://server-develop.matters.news/graphql",
  useGETForQueries: false,
  ssrMode: false,
  fetchOptions: {
    credentials: "include",
  },
})

const Layout: React.FC = ({ children }) => {
  return (
    <ClientContext.Provider value={client}>
      <Header />

      <main>{children}</main>

      <Footer />
    </ClientContext.Provider>
  )
}

export default Layout
