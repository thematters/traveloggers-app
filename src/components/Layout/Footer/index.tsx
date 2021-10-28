import React from "react"

import Copyright from "./Copyright"
import Socials from "./Socials"
import * as styles from "./styles.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.content}>
        <section className={styles.left}>
          <Copyright />
        </section>

        <section className={styles.right}>
          <Socials />
        </section>
      </section>
    </footer>
  )
}

export default Footer
