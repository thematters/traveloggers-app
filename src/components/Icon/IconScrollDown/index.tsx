import React from "react"

import { ReactComponent as Icon } from "./scroll-down.svg"
import * as styles from "./styles.module.css"

export const IconScrollDown = () => {
  return (
    <span className={styles.icon}>
      <Icon />
    </span>
  )
}
