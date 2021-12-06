import React from "react"

import { Logbook } from "~/components"

import LogbookItem from "./Item"
import * as styles from "./styles.module.css"

interface Props {
  logbooks: Logbook[]
  skipShowOwnerIfOwnedBy: string
}

const Logbooks: React.FC<Props> = ({ logbooks, skipShowOwnerIfOwnedBy }) => {
  return (
    <ul className={styles.list}>
      {logbooks.map(logbook => (
        <li key={logbook.tokenId}>
          <LogbookItem
            logbook={logbook}
            skipShowOwnerIfOwnedBy={skipShowOwnerIfOwnedBy}
          />
        </li>
      ))}
    </ul>
  )
}

export default Logbooks
