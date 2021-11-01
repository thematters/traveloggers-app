import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import env from "@/.env.json"
import {
  IconDiscord,
  IconFacebook,
  IconInstagram,
  IconMatters,
  IconOpenSea,
  IconTelegram,
  IconTwitter,
} from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

const Socials: React.FC = () => {
  const { locale } = useLocalization()

  const { matters, opensea, instagram, facebook, twitter, discord, telegram } =
    env.socialUrls[locale as Lang]

  return (
    <>
      <section className={styles.icons}>
        {matters && (
          <a href={matters}>
            <IconMatters size="md" />
          </a>
        )}

        {opensea && (
          <a href={opensea}>
            <IconOpenSea size="md" />
          </a>
        )}

        {instagram && (
          <a href={instagram}>
            <IconInstagram size="md" />
          </a>
        )}

        {facebook && (
          <a href={facebook}>
            <IconFacebook size="md" />
          </a>
        )}

        {twitter && (
          <a href={twitter}>
            <IconTwitter size="md" />
          </a>
        )}

        {discord && (
          <a href={discord}>
            <IconDiscord size="md" />
          </a>
        )}

        {telegram && (
          <a href={telegram}>
            <IconTelegram size="md" />
          </a>
        )}
      </section>

      <section className={styles.texts}>
        {matters && <a href={matters}>Matters</a>}

        {opensea && <a href={opensea}>OpenSea</a>}

        {instagram && <a href={instagram}>Instagram</a>}

        {facebook && <a href={facebook}>Facebook</a>}

        {twitter && <a href={twitter}>Twitter</a>}

        {discord && <a href={discord}>Discord</a>}

        {telegram && <a href={telegram}>Telegram</a>}
      </section>
    </>
  )
}

export default Socials
