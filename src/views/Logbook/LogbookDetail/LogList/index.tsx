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
          來自 {maskedAddress} 的宇宙訊號
        </a>
        <time>{toRelativeDateTime(log.createdAt, locale as Lang)}</time>
      </footer>
    </li>
  )
}

const LogList: React.FC<LogListProps> = ({ logs }) => {
  return (
    <ul className={styles.list}>
      {logs.map(log => (
        <LogItem log={log} key={log.createdAt.getTime()} />
      ))}
    </ul>
  )
}

export default LogList
