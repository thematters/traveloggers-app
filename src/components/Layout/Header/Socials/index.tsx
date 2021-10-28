import React from "react"

import env from "@/.env.json"
import { IconDiscord, IconTwitter } from "~/components"

import * as styles from "./styles.module.css"

const Socials = () => {
  return (
    <section className={styles.socials}>
      <a href={env.socialUrls.discord}>
        <IconDiscord size="md" />
      </a>

      <a href={env.socialUrls.twitter}>
        <IconTwitter size="md" />
      </a>
    </section>
  )
}

export default Socials
