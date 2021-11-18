import React, { useContext, useEffect, useState } from "react"

import { Logbook, LogbookLayout, Spinner } from "~/components"
import { LogbookContext } from "~/components"
import { useAccount } from "~/hooks"

import HeaderBar from "./HeaderBar"
import Intro from "./Intro"
import Logbooks from "./Logbooks"
import SearchBar from "./Searchbar"
import * as styles from "./styles.module.css"

const LogbookList = () => {
  const { account } = useAccount()
  const { getOwnNFTs, logbooks, ownNFTs, getLogbook } =
    useContext(LogbookContext)

  const [searchTokenId, setSearchTokenId] = useState("")

  useEffect(() => {
    getOwnNFTs()
  }, [account])

  const onSearch = (tokenId: string) => {
    setSearchTokenId(tokenId)
    if (tokenId) getLogbook(tokenId)
  }

  const searchLogbook = logbooks[searchTokenId]
  const ownLogbooks = ownNFTs.tokenIds
    // .filter(tokenId => tokenId in logbooks)
    .map(tokenId => logbooks[tokenId])
    .filter(l => !!l)

  if (!account && !searchTokenId) {
    return (
      <LogbookLayout
        page="listWelcome"
        header={<HeaderBar />}
        headerBar={<SearchBar onSearch={onSearch} />}
        footer={
          <footer className={styles.welcome}>
            <img src="/images/logbook/welcome.png" />
          </footer>
        }
      >
        <Intro />
      </LogbookLayout>
    )
  }

  if (searchLogbook?.error) {
    console.error("searching error:", searchLogbook?.error)
  }

  if (ownNFTs.loading || searchLogbook?.loading || searchLogbook?.error) {
    return (
      <LogbookLayout
        page="list"
        header={<HeaderBar />}
        headerBar={<SearchBar onSearch={onSearch} />}
      >
        <Spinner />
      </LogbookLayout>
    )
  }

  return (
    <LogbookLayout
      page="list"
      header={<HeaderBar />}
      headerBar={<SearchBar onSearch={onSearch} />}
    >
      <Logbooks
        logbooks={
          searchTokenId && searchLogbook
            ? [searchLogbook]
            : (ownLogbooks as Logbook[])
        }
      />
    </LogbookLayout>
  )
}

export default LogbookList
