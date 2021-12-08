import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext, useEffect, useState } from "react"

import {
  Logbook,
  LogbookContext,
  LogbookLayout,
  MuseumMode,
  Spinner,
} from "~/components"
import { Lang } from "~/enums"

import HeaderBar from "../LogbookList/HeaderBar"
import Logbooks from "../LogbookList/Logbooks"
import SearchBar from "../LogbookList/Searchbar"
import Explorer from "./Explorer"
import ExplorerButton from "./ExplorerButton"

const LogbooksMuseum = () => {
  const { locale } = useLocalization()
  const {
    logbooks,
    recentLogbooks,
    getLogbook,
    getRecentLogbooks,
    museumMode,
    toggleMuseumMode,
  } = useContext(LogbookContext)

  const [searchTokenId, setSearchTokenId] = useState("")

  const onSearch = (tokenId: string) => {
    setSearchTokenId(tokenId)
    if (tokenId) getLogbook(tokenId)
  }

  useEffect(() => {
    if (!recentLogbooks.tokenIds || recentLogbooks.tokenIds.length > 0) {
      return
    }

    getRecentLogbooks()
  }, [])

  const searchLogbook = logbooks[searchTokenId]

  if (searchLogbook?.error) {
    console.error("searching error:", searchLogbook?.error)
  }

  const selectedLogbooks =
    searchTokenId && searchLogbook
      ? [searchLogbook]
      : (recentLogbooks.tokenIds.map(tokenId => logbooks[tokenId]) as Logbook[])

  const isLoading = searchLogbook?.loading || recentLogbooks.loading
  const isExploring = museumMode === MuseumMode.graph

  return (
    <LogbookLayout
      page="list"
      header={
        <HeaderBar
          title={locale === Lang.en ? "Museum" : "航行日誌收藏館"}
          rightButtonLink="/logbooks"
        />
      }
      headerBar={
        <>
          <ExplorerButton exploring={isExploring} onClick={toggleMuseumMode} />
          <SearchBar onSearch={onSearch} />
        </>
      }
    >
      {isLoading && <Spinner />}

      {!isLoading &&
        isExploring &&
        (searchTokenId ? (
          <Explorer logbook={selectedLogbooks[0]} />
        ) : (
          <Explorer.Recent
            logbooks={selectedLogbooks}
            onTap={l => setSearchTokenId(l.tokenId)}
          />
        ))}

      {!isLoading && !isExploring && (
        <section>
          {isExploring && <SearchBar onSearch={onSearch} />}

          <Logbooks logbooks={selectedLogbooks} showOwner />
        </section>
      )}
    </LogbookLayout>
  )
}

export default LogbooksMuseum
