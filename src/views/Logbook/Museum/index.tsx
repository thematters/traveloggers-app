import React, { useContext, useEffect, useState } from "react"

import { Logbook, LogbookContext, LogbookLayout, Spinner } from "~/components"

import HeaderBar from "../LogbookList/HeaderBar"
import Logbooks from "../LogbookList/Logbooks"
import SearchBar from "../LogbookList/Searchbar"
import Explorer from "./Explorer"
import ExplorerButton from "./ExplorerButton"

const LogbooksMuseum = () => {
  const { logbooks, recentLogbooks, getLogbook, getRecentLogbooks } =
    useContext(LogbookContext)

  const [searchTokenId, setSearchTokenId] = useState("")

  const onSearch = (tokenId: string) => {
    setSearchTokenId(tokenId)
    if (tokenId) getLogbook(tokenId)
  }

  useEffect(() => {
    getRecentLogbooks()
  }, [])

  const searchLogbook = logbooks[searchTokenId]

  if (searchLogbook?.error) {
    console.error("searching error:", searchLogbook?.error)
  }

  const [exploring, setExploring] = useState(false)

  const selectedLogbooks =
    searchTokenId && searchLogbook
      ? [searchLogbook]
      : (recentLogbooks.tokenIds.map(tokenId => logbooks[tokenId]) as Logbook[])

  const isLoading = searchLogbook?.loading || recentLogbooks.loading

  return (
    <LogbookLayout
      page="list"
      header={<HeaderBar title="Museum" />}
      headerBar={
        <>
          <ExplorerButton
            exploring={exploring}
            onClick={() => setExploring(!exploring)}
          />
          <SearchBar onSearch={onSearch} />
        </>
      }
    >
      {isLoading && <Spinner />}

      {!isLoading &&
        exploring &&
        (searchTokenId ? (
          <Explorer logbook={selectedLogbooks[0]} />
        ) : (
          <Explorer.Recent
            logbooks={selectedLogbooks}
            onTap={l => setSearchTokenId(l.tokenId)}
          />
        ))}

      {!isLoading && !exploring && (
        <section>
          {exploring && <SearchBar onSearch={onSearch} />}

          <Logbooks logbooks={selectedLogbooks} showOwner />
        </section>
      )}
    </LogbookLayout>
  )
}

export default LogbooksMuseum
