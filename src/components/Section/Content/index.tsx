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
    [styles.text]: true,
    [styles.textMdUp]: isMediumUp,
  })

  return (
    <p className={classes} style={customStyles}>
      {children}
    </p>
  )
}

export default Content
