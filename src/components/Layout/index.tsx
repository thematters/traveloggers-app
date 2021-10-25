import "~/styles/defaults.css"
import "~/styles/reset.css"
import "~/styles/layouts.css"

import { Web3ReactProvider } from "@web3-react/core"
import { ethers } from "ethers"
import { ClientContext, GraphQLClient } from "graphql-hooks"
import React from "react"

import { mattersEndpoint } from "@/.env.json"

const client = new GraphQLClient({
  url: mattersEndpoint,
  useGETForQueries: false,
  ssrMode: false,
  fetchOptions: {
    credentials: "include",
  },
})

function getLibrary(provider?: any) {
  return new ethers.providers.Web3Provider(provider)
}

const Layout: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ClientContext.Provider value={client}>
        <main>{children}</main>
      </ClientContext.Provider>
    </Web3ReactProvider>
  )
}

export default Layout
