import classNames from "classnames"
import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import debounce from "lodash.debounce"
import React, { useContext, useEffect, useMemo, useRef, useState } from "react"

import env from "@/.env.json"
import {
  // Button,
  IconChevonLeft,
  IconClear,
  IconSearch,
  IconUserAnon,
  IconUserChecked,
  LinkAccountDialog,
  Section,
} from "~/components"
import { Logbook, LogbookContext, LogbookProvider, SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import { Lang } from "~/enums"
import { useAccount, useResponsive } from "~/hooks"
import {
  analytics,
  // retrieveNFT
} from "~/utils"

import * as styles from "./LogbookList.module.css"

type ItemProps = {
  logbook: Logbook
}

const LogbookListContentItem: React.FC<ItemProps> = ({ logbook }) => {
  const isMediumUp = useResponsive("md-up")
  const iconSize = isMediumUp ? "xl" : "xlM"

  // return <pre>{JSON.stringify(logbook)}</pre>

  if (!logbook || logbook.loading) return <div>Loading...</div>

  if (logbook.error)
    return (
      <div>
        Loading #{logbook.tokenId} error: {logbook.error}
      </div>
    )

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
        <p>Collectors 9 / Edited {logbook?.logs?.length ?? 0}</p>
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
  const { locale } = useLocalization()

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState("")
  // const [searchToken, setSearchToken] = useState(null)

  const { account } = useAccount()
  const { getLogbook, logbooks, getOwnNFTs, ownNFTs } =
    useContext(LogbookContext)

  useEffect(() => {
    getOwnNFTs()
    // console.log(`got nft:`, ownNFTs)
  }, [account])

  const onSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tokenId = event.target.value
    setSearchTerm(tokenId)
    getLogbook(tokenId)
    // retrieveNFT({ tokenId }) // .then(token => setSearchToken(token))
  }

  const debouncedSearchHandler = useMemo(
    () => debounce(onSearchHandler, 300),
    []
  )

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => () => debouncedSearchHandler.cancel(), [])

  return (
    <section>
      <section className={styles.searchBar}>
        <input
          ref={searchInputRef}
          type="search"
          placeholder="Enter the number from 1-1500"
          onChange={debouncedSearchHandler}
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

      {searchTerm && logbooks[searchTerm] ? (
        <section className={styles.listitems}>
          <LogbookListContentItem logbook={logbooks[searchTerm]} />
        </section>
      ) : ownNFTs?.tokenIds.length > 0 ? (
        <section className={styles.listitems}>
          {ownNFTs.tokenIds.map(id => (
            <LogbookListContentItem logbook={logbooks[id]} key={id} />
          ))}
        </section>
      ) : (
        <>
          <section className={styles.text}>
            <Section.Title>
              {locale === Lang.en ? "Record in your Logbook" : "寫下你的航行日誌"}
            </Section.Title>
            <Section.Content>
              <p>
                {locale === Lang.en ? (
                  <>
                    The owners of Traveloggers have the opportunities to record
                    in the Logbook. The Logbook and its contents will be passed
                    down to successive Travelogges owners.
                  </>
                ) : (
                  <>
                    Traveloggers的擁有者，可以有一次機會寫下日誌。日誌本及其中的內容，將隨著
                    Travelogges的所有權一起轉移
                  </>
                )}
              </p>
              <p>
                {locale === Lang.en ? (
                  <>
                    Logbook 1.0 is stored on the Ethereum mainnet. An Ethereum
                    miner fee(gas fee) is required when writing in the logbook.
                  </>
                ) : (
                  <>
                    第一代日誌本保存在以太坊的主網。寫入日誌時需要繳納以太坊礦工費（Gas
                    Fee）
                  </>
                )}
              </p>
              <p>
                {locale === Lang.en ? (
                  <>
                    Please feel free to write down anything that can represent
                    yourself or you want to express.
                  </>
                ) : (
                  <>請寫下你能代表自己，亦想向世界傳達的，最重要的文字</>
                )}
              </p>
            </Section.Content>
          </section>

          <section className={styles.intro}>
            <img src="/images/logbook-intro.png" />
          </section>
        </>
      )}

      {/* <pre>{JSON.stringify({ account, logbooks, ownNFTs })}</pre> */}
    </section>
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
                <LinkAccountDialog>
                  {({ openDialog }) => (
                    <button
                      onClick={() => {
                        analytics("click_button", {
                          type: "link_account",
                        })
                        openDialog()
                      }}
                    >
                      <IconUserAnon size={iconSize} />
                    </button>
                  )}
                </LinkAccountDialog>
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
