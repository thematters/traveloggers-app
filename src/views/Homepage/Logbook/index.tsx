import classNames from "classnames"
import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Container, Section } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

const Logbook = () => {
  const { locale } = useLocalization()

  return (
    <section className={styles.logbook}>
      <Container>
        <section className={styles.content}>
          <img className={styles.image} src="/images/logbook.png" />

          <section className={styles.text}>
            <section className={styles.title}>
              <Section.Title>
                {locale === Lang.en ? "Logbook" : "航行日誌"}
              </Section.Title>
            </section>

            <p>
              {locale === Lang.en
                ? "Write down your logbook and pass your voyage message to the next voyager."
                : "Traveloggers 遠航者，所能開啟的第一個實驗權限，是以NFT形式寫下、並傳遞航行日誌。"}
            </p>
            <p>
              {locale === Lang.en
                ? `On the journey to Matterverse, the owner of Traveloggers can log in to the personal page of Matters and write down their logbookvoyage log. When your avatar is passed on to the next owner, the next owner can unlock your log content.`
                : `Traveloggers頭像的擁有者可以在此頁面登入錢包後或者 通過Matters 的個人頁寫下自己的航行日誌。當你将頭像移轉給下一任擁有者時，下一任擁有者可以解鎖你的日誌內容。`}
            </p>
            <p>
              {locale === Lang.en
                ? `The voyage log will enter Matterverse with the avatar, and will record the collective memory of the avatar owners.`
                : `航行日誌是 Traveloggers 身份的一部分，也是Traveloggers 擁有者的集體記憶密碼。`}
            </p>
          </section>
        </section>
      </Container>
    </section>
  )
}

export default Logbook
