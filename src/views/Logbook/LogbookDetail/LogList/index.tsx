import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Log } from "~/components"
import { Lang } from "~/enums"
import { toEtherscanAddressUrl, toRelativeDateTime } from "~/utils"

import * as styles from "./styles.module.css"

type LogListProps = {
  logs: Log[]
}

const LogItem = ({ log }: { log: Log }) => {
  const { locale } = useLocalization()
  const { maskedAddress, url } = toEtherscanAddressUrl(log.sender)

  return (
    <li className={styles.log}>
      <p>{log.message}</p>
      <footer>
        <a
          className={styles.sender}
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {locale === Lang.en
            ? `Singal from ${maskedAddress}`
            : `來自 ${maskedAddress} 的宇宙訊號`}
        </a>
        <time>{toRelativeDateTime(log.createdAt, locale as Lang)}</time>
      </footer>
    </li>
  )
}

const LogList: React.FC<LogListProps> = ({ logs }) => {
  const { locale } = useLocalization()

  if (logs && logs.length === 0) {
    return (
      <p className={styles.empty}>
        {locale === Lang.en
          ? "No entries yet. Be the first one to create logbook !"
          : "目前還沒有日誌寫入，成為第一個寫入的主人吧！"}
      </p>
    )
  }

  return (
    <ul className={styles.list}>
      {logs.map(log => (
        <LogItem log={log} key={log.createdAt.getTime()} />
      ))}
    </ul>
  )
}

export default LogList
