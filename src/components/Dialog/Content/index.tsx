import classNames from "classnames"
import React from "react"

import * as styles from "./styles.module.css"

type DialogContentProps = {
  spacing?: "sm"
}

const DialogContent: React.FC<DialogContentProps> = ({ spacing, children }) => {
  const contentClasses = classNames({
    [styles.content]: true,
    ...(spacing ? { [styles[spacing]]: true } : {}),
  })

  return <section className={contentClasses}>{children}</section>
}

export default DialogContent
