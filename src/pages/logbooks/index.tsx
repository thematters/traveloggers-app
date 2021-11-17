import React from "react"

import { LogbookProvider } from "~/components"
import LogbookList from "~/views/Logbook/LogbookList"

const LogbookListPage = () => (
  <LogbookProvider>
    <LogbookList />
  </LogbookProvider>
)

export default LogbookListPage
