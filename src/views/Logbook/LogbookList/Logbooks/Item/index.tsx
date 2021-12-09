import React from "react"

import { Logbook, LogbookCard } from "~/components"

import * as styles from "./styles.module.css"

interface Props {
  logbook: Logbook
  showOwner: boolean
}

const Item: React.FC<Props> = ({ logbook, showOwner }) => {
  return (
    <section className={styles.item}>
      <LogbookCard logbook={logbook} showOwner={showOwner} />
    </section>
  )
}

export default Item
