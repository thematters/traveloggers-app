import classNames from "classnames"
import React from "react"

import { useResponsive } from "~/hooks"

import * as styles from "./styles.module.css"

interface ContentProps {
  children: React.ReactNode
  customStyles?: React.CSSProperties
}

const Content = ({ children, customStyles }: ContentProps) => {
  const isMediumUp = useResponsive("md-up")

  const classes = classNames({
    [styles.text_md]: isMediumUp,
    [styles.text_sm_s]: !isMediumUp,
  })

  return (
    <p className={classes} style={customStyles}>
      {children}
    </p>
  )
}

export default Content
