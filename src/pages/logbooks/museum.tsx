import React from "react"

import { LogbookProvider } from "~/components"
import LogbookListMuseum from "~/views/Logbook/LogbookList/Museum"

const LogbookListPage = () => (
  <LogbookProvider>
    <LogbookListMuseum />
  </LogbookProvider>
)

export default LogbookListPage
