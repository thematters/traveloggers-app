import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import env from "@/.env.json"
import { IconDiscord, IconTwitter } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

const Socials = () => {
  const { locale } = useLocalization()

  const { twitter, discord } = env.socialUrls[locale as Lang]

  return (
    <section className={styles.socials}>
      <a href={discord}>
        <IconDiscord size="md" />
      </a>

      <a href={twitter}>
        <IconTwitter size="md" />
      </a>
    </section>
  )
}

export default Socials
