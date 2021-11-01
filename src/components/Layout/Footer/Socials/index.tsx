import React from "react"

import env from "@/.env.json"
import {
  IconDiscord,
  IconMatters,
  // IconOpenSea,
  IconTwitter,
} from "~/components"

import * as styles from "./styles.module.css"

const Socials: React.FC = () => {
  return (
    <>
      <section className={styles.icons}>
        <a href={env.socialUrls.matters}>
          <IconMatters size="md" />
        </a>

        {/* <a href={env.socialUrls.opensea}>
          <IconOpenSea size="md" />
        </a> */}

        <a href={env.socialUrls.twitter}>
          <IconTwitter size="md" />
        </a>

        <a href={env.socialUrls.discord}>
          <IconDiscord size="md" />
        </a>
      </section>

      <section className={styles.texts}>
        <a href={env.socialUrls.matters}>Matters</a>

        {/* <a href={env.socialUrls.opensea}>OpenSea</a> */}

        <a href={env.socialUrls.twitter}>Twitter</a>

        <a href={env.socialUrls.discord}>Discord</a>
      </section>
    </>
  )
}

export default Socials
