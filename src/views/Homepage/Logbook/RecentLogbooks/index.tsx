import React, { useContext, useEffect } from "react"

import { Logbook, LogbookContext } from "~/components"

import LogbookSlides from "./LogbookSlides"

const RecentLogbooks = () => {
  const { getRecentLogbooks, recentLogbooks, logbooks } =
    useContext(LogbookContext)

  useEffect(() => {
    if (!recentLogbooks.tokenIds || recentLogbooks.tokenIds.length > 0) {
      return
    }

    getRecentLogbooks(5)
  }, [])

  if (!recentLogbooks || recentLogbooks.tokenIds.length <= 0) {
    return null
  }

  const books = recentLogbooks.tokenIds
    .map(tokenId => logbooks[tokenId])
    .filter(b => !!b && !b.loading)

  if (!books) {
    return null
  }

  return <LogbookSlides logbooks={books as Logbook[]} />
}

export default RecentLogbooks
