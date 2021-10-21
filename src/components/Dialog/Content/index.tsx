import classNames from "classnames"
import React from "react"

import * as styles from "./styles.module.css"

interface DialogContentProps {
  hasFixed?: boolean
  hasGrow?: boolean
}

const DialogContent: React.FC<DialogContentProps> = ({
  hasFixed,
  hasGrow,

  children,
}) => {
  const contentClasses = classNames({
    [styles.content]: true,
    [styles.hasFixed]: !!hasFixed,
    [styles.hasGrow]: !!hasGrow,
  })

  return <section className={contentClasses}>{children}</section>
}

export default DialogContent
