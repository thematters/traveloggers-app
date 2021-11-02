import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import env from "@/.env.json"
import { IconDiscord, IconTwitter } from "~/components"
import { Lang } from "~/enums"
import { analytics } from "~/utils"

import * as styles from "./styles.module.css"

const Socials = () => {
  const { locale } = useLocalization()

  const { twitter, discord } = env.socialUrls[locale as Lang]

  return (
    <section className={styles.socials}>
      <a
        href={discord}
        target="_blank"
        onClick={() => analytics("click_button", { type: "header_dis" })}
        rel="noreferrer"
      >
        <IconDiscord size="md" />
      </a>

      <a
        href={twitter}
        target="_blank"
        onClick={() => analytics("click_button", { type: "header_tt" })}
        rel="noreferrer"
      >
        <IconTwitter size="md" />
      </a>
    </section>
  )
}

export default Socials
