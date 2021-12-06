import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext, useEffect } from "react"

import env from "@/.env.json"
import {
  Button,
  Logbook,
  LogbookContext,
  LogbookLayout,
  Spinner,
} from "~/components"
import { Lang } from "~/enums"
import { useAccount } from "~/hooks"

import HeaderBar from "./HeaderBar"
import Intro from "./Intro"
import Logbooks from "./Logbooks"
import * as styles from "./styles.module.css"

const LogbookList = () => {
  const { locale } = useLocalization()
  const { account } = useAccount()
  const { getOwnNFTs, logbooks, ownNFTs } = useContext(LogbookContext)

  useEffect(() => {
    getOwnNFTs()
  }, [account])

  // const searchLogbook = logbooks[searchTokenId]
  const ownLogbooks = ownNFTs.tokenIds
    // .filter(tokenId => tokenId in logbooks)
    .map(tokenId => logbooks[tokenId])
    .filter(l => !!l)

  if (!account) {
    return (
      <LogbookLayout
        page="listWelcome"
        header={<HeaderBar />}
        // headerBar={<SearchBar onSearch={onSearch} />}
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

  if (ownNFTs.loading) {
    return (
      <LogbookLayout
        page="list"
        header={<HeaderBar />}
        // headerBar={<SearchBar onSearch={onSearch} />}
      >
        <Spinner />
      </LogbookLayout>
    )
  }

  if (account && ownLogbooks && ownLogbooks.length <= 0) {
    return (
      <LogbookLayout
        page="list"
        header={<HeaderBar />}
        // headerBar={<SearchBar onSearch={onSearch} />}
      >
        <section className={styles.card}>
          <p>
            {locale === Lang.en
              ? "You don't have any Traveloggers yet. Let’s collect one to start writing."
              : "尚未擁有任何 Traveloggers，收藏一個並開始創作。"}
          </p>

          <Button
            color="primary"
            width="100%"
            height="3rem"
            spacingY=".75rem"
            htmlHref={env.socialUrls.en.opensea}
            htmlTarget="_blank"
          >
            {locale === Lang.en ? "View on OpenSea" : "去 OpenSea 看看"}
          </Button>
        </section>
      </LogbookLayout>
    )
  }

  return (
    <LogbookLayout
      page="list"
      header={<HeaderBar />}
      // headerBar={<SearchBar onSearch={onSearch} />}
    >
      <Logbooks
        logbooks={
          // searchTokenId && searchLogbook ? [searchLogbook] :
          ownLogbooks as Logbook[]
        }
      />
    </LogbookLayout>
  )
}

export default LogbookList
