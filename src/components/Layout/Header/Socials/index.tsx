import React from "react"

import { IconDiscord, IconTwitter } from "~/components"

import * as styles from "./styles.module.css"

const Socials = () => {
  return (
    <section className={styles.socials}>
      <a href="https://matters.news">
        <IconDiscord size="md" />
      </a>

      <a href="https://matters.news">
        <IconTwitter size="md" />
      </a>
    </section>
  )
}

export default Socials
