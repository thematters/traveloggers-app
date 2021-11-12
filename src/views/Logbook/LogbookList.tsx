import classNames from "classnames"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useRef, useState } from "react"

import {
  IconChevonLeft,
  IconClear,
  IconSearch,
  // IconUserAnon,
  IconUserChecked,
  Section,
} from "~/components"
import { SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"

import * as styles from "./LogbookList.module.css"

const LogbookList = () => {
  const { locale } = useLocalization()
  const isMediumUp = useResponsive("md-up")
  const iconSize = isMediumUp ? "xl" : "xlM"
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <>
      <SEO />

      {isMediumUp && <Header originalPath={"/logbook"} />}

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
              <IconChevonLeft size={iconSize} />
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
              <IconUserChecked size={iconSize} />
            </div>
          </div>
        </section>

        <section className={styles.content}>
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
                }}
              >
                <IconClear />
              </button>
            )}
          </section>

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
        </section>

        <section className={styles.footer}></section>
      </main>

      {isMediumUp && <Footer />}
    </>
  )
}

export default LogbookList
