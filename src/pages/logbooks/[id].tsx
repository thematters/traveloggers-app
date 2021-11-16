import React from "react"

import { LogbookProvider } from "~/components"
import LogbookDetail from "~/views/Logbook/LogbookDetail"

type PageProps = {
  params: Record<string, any>
}

const LogbookDetailPage: React.FC<PageProps> = ({ params }) => (
  <LogbookProvider>
    <LogbookDetail id={params.id} originalPath={`/logbook/${params.id}`} />
  </LogbookProvider>
)

export default LogbookDetailPage
