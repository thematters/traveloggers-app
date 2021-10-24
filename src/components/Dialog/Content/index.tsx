import classNames from "classnames"
import React from "react"

import * as styles from "./styles.module.css"

const DialogContent: React.FC = ({ children }) => {
  const contentClasses = classNames({
    [styles.content]: true,
  })

  return <section className={contentClasses}>{children}</section>
}

export default DialogContent
