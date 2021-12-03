import React from "react"

import { LogbookProvider } from "~/components"
import LogbookListByOwner from "~/views/Logbook/LogbooksByOwner"

type PageProps = {
  params: Record<string, any>
}

const LogbookOwnerPage: React.FC<PageProps> = ({ params }) => (
  <LogbookProvider>
    <LogbookListByOwner
      owner={params.address}
      originalPath={`/owner/${params.adddress}`}
    />
  </LogbookProvider>
)

export default LogbookOwnerPage
