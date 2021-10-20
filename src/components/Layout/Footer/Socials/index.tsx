import React from "react"

import {
  IconDiscord,
  IconFacebook,
  IconInstagram,
  IconMatters,
  IconOpenSea,
  IconTwitter,
} from "~/components"

import * as styles from "./styles.module.css"

const Socials: React.FC = () => {
  return (
    <>
      <section className={styles.icons}>
        <a href="https://matters.news">
          <IconMatters size="md" />
        </a>

        <a href="https://matters.news">
          <IconOpenSea size="md" />
        </a>

        <a href="https://matters.news">
          <IconInstagram size="md" />
        </a>

        <a href="https://matters.news">
          <IconFacebook size="md" />
        </a>

        <a href="https://matters.news">
          <IconTwitter size="md" />
        </a>

        <a href="https://matters.news">
          <IconDiscord size="md" />
        </a>
      </section>

      <section className={styles.texts}>
        <a href="https://matters.news">Matters</a>

        <a href="https://matters.news">OpenSea</a>

        <a href="https://matters.news">Instagram</a>

        <a href="https://matters.news">Facebook</a>

        <a href="https://matters.news">Twitter</a>

        <a href="https://matters.news">Discord</a>
      </section>
    </>
  )
}

export default Socials
