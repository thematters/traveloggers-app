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
        <h3>{locale === Lang.en ? "Hint" : "提醒"}</h3>

        <ul>
          <li>
            {locale === Lang.en
              ? "Owners of Traveloggers can only write in the Logbook once."
              : "擁有者在持有 Traveloggers 期間只能寫入一次紀錄"}
          </li>
          <li>
            {locale === Lang.en
              ? "Your Logbook will be published on the Ethereum blockchain, and cannot be edited or deleted once published."
              : "Logbook 的內容會被發布在以太坊區塊鏈。內容一旦發布，將不能被修改和刪除。"}
          </li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <p></p>
        <button type="button" className={styles.button} onClick={nextStep}>
          {locale === Lang.en ? "Start" : "開始"}
        </button>
      </footer>
    </section>
  )
}

export default Hint
