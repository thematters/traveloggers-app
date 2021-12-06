import React from "react"

import { Logbook, LogbookCard } from "~/components"

import * as styles from "./styles.module.css"

interface Props {
  logbook: Logbook
}

const Item: React.FC<Props> = ({ logbook }) => {
  return (
    <section className={styles.item}>
      <LogbookCard logbook={logbook} />
    </section>
  )
}

export default Item
