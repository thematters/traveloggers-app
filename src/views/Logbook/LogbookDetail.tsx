import classNames from "classnames"
// import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext, useEffect } from "react"

import { Avatar, IconChevonLeft, Section } from "~/components"
import {
  // Container,
  Logbook,
  LogbookContext,
  LogbookEditor,
  LogbookLayout,
} from "~/components"
// import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"
import {
  // analytics,
  toEtherscanUrl,
} from "~/utils"

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
    <article>
      <div>{message}</div>
      <div className={styles.flexColumn}>
        <div className={styles.columnItem}>
          <a href={toEtherscanUrl(sender).url} target="_blank" rel="noreferrer">
            来自{sender.slice(0, 11)}...的宇宙訊號
          </a>
        </div>
        <div className={styles.columnItem}>
          {createdAt.toISOString().slice(0, 10)}
        </div>
      </div>
    </article>
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
  const logs = logbook?.logs

  return (
    <section className={styles.content}>
      <section className={styles.text}>
        <Section.Content>{logs && <LogList logs={logs} />}</Section.Content>
      </section>
    </section>
  )
}

const LogbookDetail: React.FC<PageProps> = ({ id, originalPath }) => {
  const isMediumUp = useResponsive("md-up")
  const { getLogbook, logbooks } = useContext(LogbookContext)

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

  const iconSize = isMediumUp ? "xxl" : "xl"
  const logs = logbook?.logs

  const HeaderBar = () => (
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
          <a href={logbook?.tokenOpenSeaURL} target="_blank" rel="noreferrer">
            <Avatar src={logbook?.tokenImageURL} size={iconSize} />
          </a>
        </div>
      </div>
    </section>
  )

  return (
    <LogbookLayout header={<HeaderBar />}>
      <LogbookDetailContent logbook={logbook} />

      {/* {logbook?.loading && <Spinner />} */}
      {logbook && <LogbookEditor logbook={logbook} />}
    </LogbookLayout>
  )
}

export default LogbookDetail
