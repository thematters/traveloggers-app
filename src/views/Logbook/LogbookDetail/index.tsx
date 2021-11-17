import React, { useContext, useEffect } from "react"

import { LogbookContext, LogbookLayout } from "~/components"

import Content from "./Content"
import HeaderBar from "./HeaderBar"
import LogbookEditor from "./LogbookEditor"
import * as styles from "./styles.module.css"

type PageProps = {
  id: string
  originalPath: string
}

const LogbookDetail: React.FC<PageProps> = ({ id: tokenId, originalPath }) => {
  const { getLogbook, logbooks } = useContext(LogbookContext)

  const logbook = logbooks[tokenId]
  useEffect(() => {
    if (logbook) {
      return
    }
    getLogbook(tokenId)
  }, [logbook])

  return (
    <LogbookLayout
      header={<HeaderBar tokenId={tokenId} />}
      footer={
        logbook ? (
          <section className={styles.editor}>
            <LogbookEditor logbook={logbook} />
          </section>
        ) : null
      }
    >
      <Content tokenId={tokenId} />
    </LogbookLayout>
  )
}

export default LogbookDetail
