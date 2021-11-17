import React, { useContext, useEffect } from "react"

import { LogbookContext, LogbookEditor, Spinner } from "~/components"

import LogList from "../LogList"
import * as styles from "./styles.module.css"

type ContentProps = {
  tokenId: string
}

const Content: React.FC<ContentProps> = ({ tokenId }) => {
  const { getLogbook, logbooks } = useContext(LogbookContext)

  const logbook = logbooks[tokenId]
  useEffect(() => {
    if (logbook) {
      return
    }
    getLogbook(tokenId)
  }, [logbook])

  if (logbook?.loading) {
    return (
      <section className={styles.content}>
        <Spinner />
      </section>
    )
  }

  if (logbook?.error) {
    return (
      <section className={styles.content}>
        <section className={styles.card}>{logbook.error}</section>
      </section>
    )
  }

  if (!logbook) {
    return (
      <section className={styles.content}>
        <section className={styles.card}>Logbook does not exists.</section>
      </section>
    )
  }

  return (
    <>
      <section className={styles.content}>
        <LogList logs={logbook.logs} />
      </section>

      {logbook && (
        <section className={styles.editor}>
          <LogbookEditor logbook={logbook} />
        </section>
      )}
    </>
  )
}

export default Content
