import classNames from "classnames"
// import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext, useEffect } from "react"

import env from "@/.env.json"
import { Avatar, IconChevonLeft, Section } from "~/components"
import {
  Container,
  Logbook,
  LogbookContext,
  LogbookEditor,
  SEO,
} from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
// import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"
import { analytics, toEtherscanUrl } from "~/utils"

import * as styles from "./LogbookDetail.module.css"

type PageProps = {
  id: string
  originalPath: string
}

type LogbookDetailContentProps = {
  logbook: Logbook
}

type Log = {
  sender: string
  message: string
  createdAt: Date
}

type LogListProps = {
  logs: Log[]
}

const LogListItem: React.FC<Log> = ({ sender, message, createdAt }) => {
  // const { locale } = useLocalization()
  return (
    <>
      <li>
        <article>
          <div>
            {message}i want an album of songs that each sounds like a
            radio-friendly hit, warm and crispy, but with math-rock-like
            polyrhythmic drum patterns instead of a regular beat. like a
            funhouse version of popular music that is accessible in every way
            except drums. like a crumbling teeth dream
          </div>
          <div className={styles.flexColumn}>
            <div className={styles.columnItem}>
              <a href={toEtherscanUrl(sender).url}>
                来自{sender.slice(0, 11)}...的宇宙訊號
              </a>
            </div>
            <div className={styles.columnItem}>
              {createdAt.toISOString().slice(0, 10)}
            </div>
          </div>
        </article>
      </li>
      <li>
        <article>
          <div>
            {message}i want an album of songs that each sounds like a
            radio-friendly hit, warm and crispy, but with math-rock-like
            polyrhythmic drum patterns instead of a regular beat. like a
            funhouse version of popular music that is accessible in every way
            except drums. like a crumbling teeth dream
          </div>
          <div className={styles.flexColumn}>
            <div className={styles.columnItem}>
              <a href={toEtherscanUrl(sender).url}>
                来自{sender.slice(0, 11)}...的宇宙訊號
              </a>
            </div>
            <div className={styles.columnItem}>
              {createdAt.toISOString().slice(0, 10)}
            </div>
          </div>
        </article>
      </li>
      <li>
        <article>
          <div>
            {message}i want an album of songs that each sounds like a
            radio-friendly hit, warm and crispy, but with math-rock-like
            polyrhythmic drum patterns instead of a regular beat. like a
            funhouse version of popular music that is accessible in every way
            except drums. like a crumbling teeth dream
          </div>
          <div className={styles.flexColumn}>
            <div className={styles.columnItem}>
              <a href={toEtherscanUrl(sender).url}>
                来自{sender.slice(0, 11)}...的宇宙訊號
              </a>
            </div>
            <div className={styles.columnItem}>
              {createdAt.toISOString().slice(0, 10)}
            </div>
          </div>
        </article>
      </li>
      <li>
        <article>
          <div>
            {message}i want an album of songs that each sounds like a
            radio-friendly hit, warm and crispy, but with math-rock-like
            polyrhythmic drum patterns instead of a regular beat. like a
            funhouse version of popular music that is accessible in every way
            except drums. like a crumbling teeth dream
          </div>
          <div className={styles.flexColumn}>
            <div className={styles.columnItem}>
              <a href={toEtherscanUrl(sender).url}>
                来自{sender.slice(0, 11)}...的宇宙訊號
              </a>
            </div>
            <div className={styles.columnItem}>
              {createdAt.toISOString().slice(0, 10)}
            </div>
          </div>
        </article>
      </li>
    </>
  )
}

const LogList: React.FC<LogListProps> = ({ logs }) => {
  const listItems = logs.map(props => {
    return <LogListItem {...props} key={props?.sender} />
  })
  return <ul>{listItems}</ul>
}

const LogbookDetailContent: React.FC<LogbookDetailContentProps> = ({
  logbook,
}) => {
  const isMediumUp = useResponsive("md-up")
  // const { locale } = useLocalization()
  const iconSize = isMediumUp ? "xxl" : "xl"
  const logs = logbook?.logs

  return (
    <>
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
            <h1>{`Transition: ${logs ? logs.length : ".."}`}</h1>
          </div>
          <div
            className={classNames({
              [styles.side]: true,
              [styles.boxShadow]: isMediumUp,
            })}
          >
            <a href={logbook?.tokenOpenSeaURL}>
              <Avatar src={logbook?.tokenImageURL} size={iconSize} />
            </a>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <section className={styles.text}>
          <Section.Content>{logs && <LogList logs={logs} />}</Section.Content>
        </section>
      </section>
    </>
  )
}

const LogbookDetail: React.FC<PageProps> = ({ id, originalPath }) => {
  const isMediumUp = useResponsive("md-up")
  const { getLogbook, logbooks } = useContext(LogbookContext)

  useEffect(() => {
    import("firebase/app").then(({ initializeApp }) => {
      initializeApp(env.firebase)
      analytics("page_view")
    })
  }, [])

  const logbook = logbooks[id]
  useEffect(() => {
    if (logbook) {
      return
    }
    getLogbook(id)
  }, [logbook])

  if (!logbook) {
    return <h2>Logbook does not exist</h2>
  }

  return (
    <>
      <SEO />

      {isMediumUp && <Header originalPath={originalPath} />}

      <main className={styles.main}>
        <section className={styles.header}></section>
        <section className={styles.left}></section>
        <section className={styles.right}></section>

        <Container>
          <LogbookDetailContent logbook={logbook} />
        </Container>

        <section className={styles.footer}></section>
      </main>

      <Container>
        {/* {logbook?.loading && <Spinner />} */}
        {logbook && <LogbookEditor logbook={logbook} />}
      </Container>

      {isMediumUp && <Footer />}
    </>
  )
}

export default LogbookDetail
