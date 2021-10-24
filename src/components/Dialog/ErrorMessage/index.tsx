import React from "react"

import { IconInfo } from "~/components"

import * as styles from "./styles.module.css"

const DialogErrorMessage: React.FC = ({ children }) => {
  return (
    <section className={styles.error}>
      <span className={styles.icon}>
        <IconInfo color="red" />
      </span>

      {children}
    </section>
  )
}

export default DialogErrorMessage
