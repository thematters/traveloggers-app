import React from "react"

import { LogbookProvider } from "~/components"
import LogbookMuseum from "~/views/Logbook/Museum"

const LogbookListPage = () => (
  <LogbookProvider>
    <LogbookMuseum />
  </LogbookProvider>
)

export default LogbookListPage
