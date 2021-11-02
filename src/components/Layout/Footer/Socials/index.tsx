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
import { analytics } from "~/utils"

import * as styles from "./styles.module.css"

const Socials: React.FC = () => {
  const { locale } = useLocalization()

  const { matters, opensea, instagram, facebook, twitter, discord, telegram } =
    env.socialUrls[locale as Lang]

  return (
    <>
      <section className={styles.icons}>
        {matters && (
          <a
            href={matters}
            onClick={() =>
              analytics("click_button", { type: "footer_matters" })
            }
          >
            <IconMatters size="md" />
          </a>
        )}

        {opensea && (
          <a
            href={opensea}
            onClick={() => analytics("click_button", { type: "footer_os" })}
          >
            <IconOpenSea size="md" />
          </a>
        )}

        {instagram && (
          <a
            href={instagram}
            onClick={() => analytics("click_button", { type: "footer_ins" })}
          >
            <IconInstagram size="md" />
          </a>
        )}

        {facebook && (
          <a
            href={facebook}
            onClick={() => analytics("click_button", { type: "footer_fb" })}
          >
            <IconFacebook size="md" />
          </a>
        )}

        {twitter && (
          <a
            href={twitter}
            onClick={() => analytics("click_button", { type: "footer_tt" })}
          >
            <IconTwitter size="md" />
          </a>
        )}

        {discord && (
          <a
            href={discord}
            onClick={() => analytics("click_button", { type: "footer_dis" })}
          >
            <IconDiscord size="md" />
          </a>
        )}

        {telegram && (
          <a
            href={telegram}
            onClick={() => analytics("click_button", { type: "footer_tg" })}
          >
            <IconTelegram size="md" />
          </a>
        )}
      </section>

      <section className={styles.texts}>
        {matters && (
          <a
            href={matters}
            onClick={() =>
              analytics("click_button", { type: "footer_matters" })
            }
          >
            Matters
          </a>
        )}

        {opensea && (
          <a
            href={opensea}
            onClick={() => analytics("click_button", { type: "footer_os" })}
          >
            OpenSea
          </a>
        )}

        {instagram && (
          <a
            href={instagram}
            onClick={() => analytics("click_button", { type: "footer_ins" })}
          >
            Instagram
          </a>
        )}

        {facebook && (
          <a
            href={facebook}
            onClick={() => analytics("click_button", { type: "footer_fb" })}
          >
            Facebook
          </a>
        )}

        {twitter && (
          <a
            href={twitter}
            onClick={() => analytics("click_button", { type: "footer_tt" })}
          >
            Twitter
          </a>
        )}

        {discord && (
          <a
            href={discord}
            onClick={() => analytics("click_button", { type: "footer_dis" })}
          >
            Discord
          </a>
        )}

        {telegram && (
          <a
            href={telegram}
            onClick={() => analytics("click_button", { type: "footer_tg" })}
          >
            Telegram
          </a>
        )}
      </section>
    </>
  )
}

export default Socials
