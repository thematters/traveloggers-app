import classNames from "classnames"
import React, { useContext } from "react"

import { Avatar, IconChevonLeft, LogbookContext } from "~/components"
import { useResponsive } from "~/hooks"

import * as styles from "./styles.module.css"

type HeaderBarProps = {
  tokenId: string
}

const HeaderBar: React.FC<HeaderBarProps> = ({ tokenId }) => {
  const isMediumUp = useResponsive("md-up")
  const iconSize = isMediumUp ? "xxl" : "xl"

  const { logbooks } = useContext(LogbookContext)
  const logbook = logbooks[tokenId]

  return (
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
          <h1>{`Transition: ${
            logbook?.logs ? logbook.logs.length : "..."
          }`}</h1>
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
}

export default HeaderBar
