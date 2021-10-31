import classNames from "classnames"
import React from "react"

import {
  IconTimelineFinished,
  IconTimelineOngoing,
  IconTimelineReady,
} from "~/components"
import { useResponsive } from "~/hooks"

import * as styles from "./timeline.module.css"

interface TimelineProps {
  state: "upcoming" | "open" | "closed"
  fade?: "in" | "out"
}

const Timeline = ({ state, fade }: TimelineProps) => {
  const isMediumUp = useResponsive("md-up")
  const iconSize = isMediumUp ? "xlM" : "mdS"

  if (fade) {
    const fadeClasses = classNames({
      [styles.line]: true,
      [styles.fade]: !!fade,
      [styles[`${state}Fade${fade}`]]: true,
    })
    return (
      <section className={styles.container}>
        <div className={fadeClasses} />
      </section>
    )
  }

  const lineClasses = classNames({
    [styles.line]: true,
    [styles.lineClosed]: state === "closed",
  })

  return (
    <section className={styles.container}>
      {state === "upcoming" && <IconTimelineReady size={iconSize} />}
      {state === "open" && <IconTimelineOngoing size={iconSize} />}
      {state === "closed" && <IconTimelineFinished size={iconSize} />}
      <div className={lineClasses} />
    </section>
  )
}

export default Timeline
