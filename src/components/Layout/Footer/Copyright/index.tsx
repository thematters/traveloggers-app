import React from "react"

import * as styles from "./styles.module.css"

const Copyright = () => {
  return (
    <section className={styles.copyright}>
      <section>
        @ <span itemProp="copyrightYear">{new Date().getFullYear()}</span>
        <span itemProp="copyrightHolder">, All Rights Reserved</span>
      </section>

      <section className={styles.designedBy}>Designed By Matters Lab.</section>
    </section>
  )
}

export default Copyright
