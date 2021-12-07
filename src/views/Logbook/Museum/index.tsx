import React, { useContext, useEffect, useState } from "react"

import { Logbook, LogbookContext, LogbookLayout, Spinner } from "~/components"

import HeaderBar from "../LogbookList/HeaderBar"
import Logbooks from "../LogbookList/Logbooks"
import SearchBar from "../LogbookList/Searchbar"
import Explorer from "./Explorer"
import ExplorerButton from "./ExplorerButton"
import * as styles from "./styles.module.css"

const byMostRecent = (a: Logbook, b: Logbook) => {
  if (
    !(
      Array.isArray(a?.logs) &&
      a.logs.length > 0 &&
      Array.isArray(b?.logs) &&
      b.logs.length > 0
    )
  )
    return NaN

  const t1 = a.logs[a.logs.length - 1].createdAt,
    t2 = b.logs[b.logs.length - 1].createdAt
  return t2 < t1 ? -1 : t2 > t1 ? 1 : t2 >= t1 ? 0 : NaN
}

const LogbooksMuseum = () => {
  const { logbooks, getLogbook, getRecentLogbooks } = useContext(LogbookContext)

  const [searchTokenId, setSearchTokenId] = useState("")

  const onSearch = (tokenId: string) => {
    setSearchTokenId(tokenId)
    if (tokenId) getLogbook(tokenId)
  }

  useEffect(() => {
    getRecentLogbooks()
  }, [])

  const searchLogbook = logbooks[searchTokenId]
  const recentLogbooks = (Object.values(logbooks) as Logbook[])
    .filter(
      logbook =>
        logbook &&
        !logbook.loading &&
        !logbook.error &&
        logbook?.logs.length > 0
    )
    .sort(byMostRecent)

  if (searchLogbook?.error) {
    console.error("searching error:", searchLogbook?.error)
  }

  const [exploring, setExploring] = useState(false)

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
      {exploring && searchLogbook ? <Explorer logbook={searchLogbook} /> : null}

      {!exploring && (
        <section className={exploring ? styles.exploring : ""}>
          {exploring && <SearchBar onSearch={onSearch} />}

          {searchLogbook?.loading || searchLogbook?.error ? (
            <Spinner />
          ) : (
            <Logbooks
              logbooks={
                searchTokenId && searchLogbook
                  ? [searchLogbook]
                  : recentLogbooks
              }
              showOwner
            />
          )}
        </section>
      )}
    </LogbookLayout>
  )
}

export default LogbooksMuseum
