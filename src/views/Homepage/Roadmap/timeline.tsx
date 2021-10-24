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
  state: "ready" | "ongoing" | "finished"
  fade?: "in" | "out"
}

const Timeline = ({ state, fade }: TimelineProps) => {
  const isMediumUp = useResponsive("md-up")
  const iconSize = isMediumUp ? "xlM" : "mdS"

  const baseClasses = {
    [styles.line]: true,
    [styles.line_md_up]: isMediumUp,
  }

  if (fade) {
    const fadeClasses = classNames({
      ...baseClasses,
      [styles.fade]: !!fade,
      [styles[`${state}_fade_${fade}`]]: true,
    })
    return (
      <section className={styles.container}>
        <div className={fadeClasses} />
      </section>
    )
  }

  const lineClasses = classNames({
    ...baseClasses,
    [styles.line_finished]: state === "finished",
  })

  return (
    <section className={styles.container}>
      {state === "ready" && <IconTimelineReady size={iconSize} />}
      {state === "ongoing" && <IconTimelineOngoing size={iconSize} />}
      {state === "finished" && <IconTimelineFinished size={iconSize} />}
      <div className={lineClasses} />
    </section>
  )
}

export default Timeline
