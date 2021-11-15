import classNames from "classnames"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useEffect, useState } from "react"

import { Avatar, IconChevonLeft, Section } from "~/components"
import { SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"
import { useLogbook } from "~/hooks"
import { toEtherscanUrl } from "~/utils"

import * as styles from "./LogbookDetail.module.css"

type Log = {
  sender: string 
  message: string
  createdAt: string
}

type PageProps = {
  id: string
  originalPath: string
}

type LogListProps = {
  logs: Log[]
}

const LogListItem: React.FC<Log> = ({sender, message, createdAt}) => {
  // const { locale } = useLocalization()
  return (
    <li>
      {message} <br/>
      <a href={toEtherscanUrl(sender).url}>来自{sender.slice(0, 13)}...的宇宙訊號</a><br/>
      {createdAt}
    </li>
  );
}

const LogList: React.FC<LogListProps> = ({logs}) => {
  const listItems = logs.map((log) => {
    const date = new Date(parseInt(log.createdAt) * 1000)
    const props = {
      ...log,
      createdAt: date.toISOString().slice(0, 10)
    } 
    return <LogListItem {...props} key={log?.sender}/>
  })
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const LogbookDetail: React.FC<PageProps> = ({ id, originalPath }) => {
  const { locale } = useLocalization()
  const isMediumUp  = useResponsive("md-up")
  const iconSize = isMediumUp ? "xxl": "xl"

  // states & side-effects 
  const { getLogbook } = useLogbook()
  const [ logs, setLogs ] = useState<Log[]>([])
  const [ avatarUrl, setAvatarUrl ] = useState<string>("") 
  const [ openSeaUrl, setOpenSeaUrl ] = useState<string>("")

  useEffect(() => {
    const readLogbook = async () => {
      const [logbook, token] = await getLogbook(id)
      setLogs(logbook.logs)
      setAvatarUrl(token.image_preview_url)
      setOpenSeaUrl(token.permalink)
    }
    readLogbook()
  }, []);

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
                [styles.side]: !isMediumUp,
                [styles.boxShadow]: isMediumUp,
              })}
            >
              <IconChevonLeft size={iconSize} />
            </div>
            <div className={styles.boxShadow}>
              <h1>{locale === Lang.en ? `Transition:${logs.length}` : `Transaction:${logs.length}`}</h1>
            </div>
            <div
              className={classNames({
                [styles.side]: !isMediumUp,
                [styles.boxShadow]: isMediumUp,
              })}
            >
              <a href={openSeaUrl}><Avatar src={avatarUrl} size={iconSize} /></a>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          {/* <section><LogList /></section>  */}
          <section className={styles.text}>
            <Section.Content>
              <LogList logs={logs}/>
            </Section.Content>
          </section>
        </section>
        <section className={styles.footer}></section>

      </main>
      {isMediumUp && <Footer />}
    </>
  )
}

export default LogbookDetail
