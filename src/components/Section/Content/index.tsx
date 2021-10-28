import React from "react"

import * as styles from "./styles.module.css"

const Content: React.FC = ({ children }) => {
  return <section className={styles.content}>{children}</section>
}

export default Content
