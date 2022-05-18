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

  const { matters, logbook, opensea, instagram, facebook, twitter, discord, telegram } =
    env.socialUrls[locale as Lang]

  return (
    <>
      <section className={styles.icons}>
        {matters && (
          <a
            href={matters}
            target="_blank"
            onClick={() =>
              analytics("click_button", { type: "footer_matters" })
            }
            rel="noreferrer"
          >
            <IconMatters size="md" />
          </a>
        )}

        {opensea && (
          <a
            href={opensea}
            target="_blank"
            onClick={() => analytics("click_button", { type: "footer_os" })}
            rel="noreferrer"
          >
            <IconOpenSea size="md" />
          </a>
        )}

        {instagram && (
          <a
            href={instagram}
            target="_blank"
            onClick={() => analytics("click_button", { type: "footer_ins" })}
            rel="noreferrer"
          >
            <IconInstagram size="md" />
          </a>
        )}

        {facebook && (
          <a
            href={facebook}
            target="_blank"
            onClick={() => analytics("click_button", { type: "footer_fb" })}
            rel="noreferrer"
          >
            <IconFacebook size="md" />
          </a>
        )}

        {twitter && (
          <a
            href={twitter}
            target="_blank"
            onClick={() => analytics("click_button", { type: "footer_tt" })}
            rel="noreferrer"
          >
            <IconTwitter size="md" />
          </a>
        )}

        {discord && (
          <a
            href={discord}
            target="_blank"
            onClick={() => analytics("click_button", { type: "footer_dis" })}
            rel="noreferrer"
          >
            <IconDiscord size="md" />
          </a>
        )}

        {telegram && (
          <a
            href={telegram}
            target="_blank"
            onClick={() => analytics("click_button", { type: "footer_tg" })}
            rel="noreferrer"
          >
            <IconTelegram size="md" />
          </a>
        )}
      </section>

      <section className={styles.texts}>
        {matters && (
          <a
            href={matters}
            target="_blank"
            onClick={() =>
              analytics("click_button", { type: "footer_matters" })
            }
            rel="noreferrer"
          >
            Matters
          </a>
        )}

        {logbook && (
          <a
            href={logbook}
            target="_blank"
            onClick={() => analytics("click_button", { type: "footer_logbook" })}
            rel="noreferrer"
          >
           Logbook
          </a>
        )}

        {opensea && (
          <a
            href={opensea}
            target="_blank"
            onClick={() => analytics("click_button", { type: "footer_os" })}
            rel="noreferrer"
          >
            OpenSea
          </a>
        )}

        {instagram && (
          <a
            href={instagram}
            target="_blank"
            onClick={() => analytics("click_button", { type: "footer_ins" })}
            rel="noreferrer"
          >
            Instagram
          </a>
        )}

        {facebook && (
          <a
            href={facebook}
            target="_blank"
            onClick={() => analytics("click_button", { type: "footer_fb" })}
            rel="noreferrer"
          >
            Facebook
          </a>
        )}

        {twitter && (
          <a
            href={twitter}
            target="_blank"
            onClick={() => analytics("click_button", { type: "footer_tt" })}
            rel="noreferrer"
          >
            Twitter
          </a>
        )}

        {discord && (
          <a
            href={discord}
            target="_blank"
            onClick={() => analytics("click_button", { type: "footer_dis" })}
            rel="noreferrer"
          >
            Discord
          </a>
        )}

        {telegram && (
          <a
            href={telegram}
            target="_blank"
            onClick={() => analytics("click_button", { type: "footer_tg" })}
            rel="noreferrer"
          >
            Telegram
          </a>
        )}
      </section>
    </>
  )
}

export default Socials
