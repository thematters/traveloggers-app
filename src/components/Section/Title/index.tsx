import classNames from "classnames"
import React from "react"

import { useResponsive } from "~/hooks"

import * as styles from "./styles.module.css"

const Title = ({ children }: { children: React.ReactNode }) => {
  const isMediumUp = useResponsive("md-up")

  const classes = classNames({
    [styles.text]: true,
    [styles.text_md_up]: isMediumUp,
    [styles.center]: !isMediumUp,
  })

  return <h2 className={classes}>{children}</h2>
}

export default Title
