import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

type HintProps = {
  nextStep: () => void
}

const Hint: React.FC<HintProps> = ({ nextStep }) => {
  const { locale } = useLocalization()

  return (
    <section className={styles.content}>
      <section>
        <h3>{locale === Lang.en ? "Hint" : "Hint"}</h3>

        <ul>
          <li>Each owner can only write once during the possession period. </li>
          <li>
            It will be on the chain after it is sent and cannot be modified or
            deleted.
          </li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <p></p>
        <button type="button" className={styles.button} onClick={nextStep}>
          Start
        </button>
      </footer>
    </section>
  )
}

export default Hint
