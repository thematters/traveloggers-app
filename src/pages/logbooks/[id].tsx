import React from "react"

import LogbookDetail from "~/views/Logbook/LogbookDetail"

type PageProps = {
  params: Record<string, any>
}

const LogbookDetailPage: React.FC<PageProps> = ({ params }) => (
  <LogbookDetail id={params.id} originalPath={`/logbooks/${params.id}`} />
)

export default LogbookDetailPage
