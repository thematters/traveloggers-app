import React from "react"

import LogbookListByOwner from "~/views/Logbook/LogbooksByOwner"

type PageProps = {
  params: Record<string, any>
}

const LogbookOwnerPage: React.FC<PageProps> = ({ params }) => (
  <LogbookListByOwner
    owner={params.address}
    originalPath={`/owner/${params.adddress}`}
  />
)

export default LogbookOwnerPage
