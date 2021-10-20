import React from "react"

import { LanguageSwitch } from "~/components"

import Copyright from "./Copyright"
import Socials from "./Socials"
import * as styles from "./styles.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.content}>
        <section className={styles.left}>
          <Copyright />

          <section className={styles.languageSwitch}>
            <LanguageSwitch color="grey" />
          </section>
        </section>

        <section className={styles.right}>
          <Socials />
        </section>
      </section>
    </footer>
  )
}

export default Footer
