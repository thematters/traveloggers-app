import React from "react"

import * as styles from "./styles.module.css"

interface Props {
  title: React.ReactNode | string
  description: React.ReactNode | string
}

export const MessageBox: React.FC<Props> = ({ title, description }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <p className={styles.description}>{description}</p>
    </section>
  )
}
