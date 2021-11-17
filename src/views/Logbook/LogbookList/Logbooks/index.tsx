import React from "react"

import { Logbook } from "~/components"

import LogbookItem from "./Item"
import * as styles from "./styles.module.css"

const Logbooks = ({ logbooks }: { logbooks: Logbook[] }) => {
  return (
    <ul className={styles.list}>
      {logbooks.map(logbook => (
        <li key={logbook.tokenId}>
          <LogbookItem logbook={logbook} />
        </li>
      ))}
    </ul>
  )
}

export default Logbooks
