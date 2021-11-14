import classNames from "classnames"
import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import React, { useContext, useEffect, useRef, useState } from "react"

import env from "@/.env.json"
import {
  // Button,
  IconChevonLeft,
  IconClear,
  IconSearch,
  IconUserAnon,
  IconUserChecked,
  Section,
} from "~/components"
import { Logbook, LogbookContext, LogbookProvider, SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import { Lang } from "~/enums"
import { useAccount, useResponsive } from "~/hooks"
import { analytics } from "~/utils"

import * as styles from "./LogbookList.module.css"

type ItemProps = {
  logbook: Logbook
}

const LogbookListContentItem: React.FC<ItemProps> = ({ logbook }) => {
  const isMediumUp = useResponsive("md-up")
  const iconSize = isMediumUp ? "xl" : "xlM"

  return (
    <div className={styles.listitem}>
      <div
        className={styles.avatar}
        style={{
          backgroundImage: `url("${logbook.tokenImageURL}")`,
        }}
      />
      <div className={styles.avatarDescription}>
        <h3>Traveloggers #{logbook.tokenId}</h3>
        <p>Collectors 9 / Edited {logbook.logs.length}</p>
      </div>
      <div className={styles.avatarDetailLink}>
        <Link to={`/logbooks/${logbook.tokenId}`} language={undefined}>
          <IconChevonLeft
            size={iconSize}
            color="white"
            className={styles.rotate180}
          />
        </Link>
      </div>
    </div>
  )
}

const LogbookListContent = () => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const { account } = useAccount()
  const { logbooks, getOwnNFTs, ownNFTs } = useContext(LogbookContext)

  useEffect(() => {
    getOwnNFTs()
    // console.log(`got nft:`, ownNFTs)
  }, [account])

  return (
    <>
      <section className={styles.searchBar}>
        <input
          ref={searchInputRef}
          type="search"
          placeholder="Enter the number from 1-1500"
          onChange={event => setSearchTerm(event.target.value)}
        />
        <button
          className={styles.search}
          onClick={() => {
            searchInputRef.current?.focus()
            analytics("click_button", { type: "logbooks_search" })
          }}
        >
          <IconSearch />
        </button>
        {searchTerm.length > 0 && (
          <button
            className={styles.clear}
            onClick={() => {
              if (searchInputRef.current) searchInputRef.current.value = ""
              setSearchTerm("")
              searchInputRef.current?.focus()
              analytics("click_button", { type: "logbooks_clear" })
            }}
          >
            <IconClear />
          </button>
        )}
      </section>

      {ownNFTs?.tokenIds.length > 0 ? (
        <section className={styles.listitems}>
          {ownNFTs.tokenIds.map(id => (
            <LogbookListContentItem logbook={logbooks[id]} key={id} />
          ))}
        </section>
      ) : (
        <>
          <section className={styles.text}>
            <Section.Title>Create memory in Matterverse</Section.Title>
            <Section.Content>
              <p>Write your chapter and pass it on to the next person</p>
              <p>
                The current owner of the Avatar can unlock all the text in the
                Logbook
              </p>
            </Section.Content>
          </section>

          <section className={styles.intro}>
            <img src="/images/logbook-intro.png" />
          </section>
        </>
      )}

      {/* <pre>{JSON.stringify({ account, logbooks, ownNFTs })}</pre> */}
    </>
  )
}

const LogbookList = () => {
  const { locale } = useLocalization()
  const isMediumUp = useResponsive("md-up")
  const iconSize = isMediumUp ? "xl" : "xlM"

  useEffect(() => {
    import("firebase/app").then(({ initializeApp }) => {
      initializeApp(env.firebase)
      analytics("page_view")
    })
  }, [])

  const { account } = useAccount()

  return (
    <LogbookProvider>
      <SEO />

      {isMediumUp && <Header originalPath={"/logbooks"} />}

      <main className={styles.main}>
        <section className={styles.header}></section>
        <section className={styles.left}></section>
        <section className={styles.right}></section>

        <section className={styles.toolbarHeader}>
          <div>
            <div
              className={classNames({
                [styles.side]: true,
                [styles.boxShadow]: isMediumUp,
              })}
            >
              <IconChevonLeft size={iconSize} color="gold" />
            </div>
            <div
              className={classNames({
                [styles.barTitle]: true,
                [styles.boxShadow]: true,
              })}
            >
              <h1>{locale === Lang.en ? "LOGBOOK" : "航行日誌"}</h1>
            </div>
            <div
              className={classNames({
                [styles.side]: true,
                [styles.boxShadow]: isMediumUp,
              })}
            >
              {account ? (
                <IconUserChecked size={iconSize} />
              ) : (
                <IconUserAnon size={iconSize} />
              )}
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <LogbookListContent />
        </section>

        <section className={styles.footer}></section>
      </main>

      {isMediumUp && <Footer />}
    </LogbookProvider>
  )
}

export default LogbookList
