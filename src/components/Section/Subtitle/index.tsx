import classNames from "classnames"
import React from "react"

import { useResponsive } from "~/hooks"

import * as styles from "./styles.module.css"

interface SubitleProps {
  children: React.ReactNode
  customStyles?: React.CSSProperties
}

const Subitle = ({ children, customStyles }: SubitleProps) => {
  const isMediumUp = useResponsive("md-up")

  const classes = classNames({
    [styles.text]: true,
    [styles.text_md_up]: isMediumUp,
  })

  return (
    <h4 className={classes} style={customStyles}>
      {children}
    </h4>
  )
}

export default Subitle
