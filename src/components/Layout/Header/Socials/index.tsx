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
        onClick={() => analytics("click_button", { type: "header_dis" })}
      >
        <IconDiscord size="md" />
      </a>

      <a
        href={twitter}
        onClick={() => analytics("click_button", { type: "header_tt" })}
      >
        <IconTwitter size="md" />
      </a>
    </section>
  )
}

export default Socials
