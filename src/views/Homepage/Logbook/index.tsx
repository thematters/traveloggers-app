import classNames from "classnames"
import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Container } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

const Logbook = () => {
  const { locale } = useLocalization()

  return (
    <section className={styles.logbook}>
      <Container>
        <div className={styles.l_row}>
          <div className={classNames(styles.column, styles.col_left)}>
            <img src="/images/logbook.png" />
          </div>
          <div className={classNames(styles.column, styles.col_right)}>
            <h2>
              {locale === Lang.en
                ? "Logbook"
                : locale === Lang.zhHans
                ? "航行日志"
                : "航行日誌"}
            </h2>
            <p>
              {locale === Lang.en
                ? "Write down your logbookvoyage log and pass your voyage message to the next voyager."
                : locale === Lang.zhHans
                ? "写下你的航行日志，将你的航行寄语传递给下一任远航者。"
                : "寫下你的航行日誌，將你的航行寄語傳遞給下一任遠航者。"}
            </p>
            <p>
              {locale === Lang.en
                ? `On the journey to Matterverse, the owner of Traveloggers can log in to the personal page of Matters and write down their logbookvoyage log. When your avatar is passed on to the next owner, the next owner can unlock your log content. The voyage log will enter Matterverse with the avatar, and will record the collective memory of the avatar owners.`
                : locale === Lang.zhHans
                ? `在通向马特宇宙的征途中，Traveloggers的拥有者可以登入 Matters 的个人页面写下自己的航行日志。当你的Avatar 移交给下一任拥有者时，下一任拥有者可以解锁你的日志内容。航行日志会伴随着 Avatar 进入到马特宇宙，将会纪录 Avatar 拥有者的集体记忆。`
                : `在通向馬特宇宙的征途中，Traveloggers的擁有者可以登入 Matters 的個人頁面寫下自己的航行日誌。當你的Avatar 移交給下一任擁有者時，下一任擁有者可以解鎖你的日誌內容。航行日誌會伴隨著 Avatar 進入到馬特宇宙，將會紀錄 Avatar 擁有者的集體記憶。`}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Logbook
