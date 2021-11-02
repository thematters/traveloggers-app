import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Container, Section } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

const Logbook = () => {
  const { locale } = useLocalization()

  return (
    <section className={styles.logbook}>
      <div>
        <Container>
          <section className={styles.content}>
            <img className={styles.image} src="/images/logbook.png" />

            <section className={styles.text}>
              <section className={styles.title}>
                <Section.Title>
                  {locale === Lang.en ? "The Logbook" : "航行日誌"}
                </Section.Title>
              </section>

              <Section.Content>
                <p>
                  {locale === Lang.en
                    ? "Traveloggers can record their journey on NFT and pass the logbook to the next Traveloggers."
                    : "Traveloggers 可以向 NFT 中寫下、並傳遞航行日誌。"}
                </p>
                <p>
                  {locale === Lang.en
                    ? "Each Travelogger avatar comes with a unique logbook, on which only the avatar’s owner can record their journey. When the avatar is passed on to the next owner, the next owner can review and own all the former log contents."
                    : "每個 Traveloggers 頭像隱藏了獨一無二的航行日誌本，只有擁有者可以向其中添加紀錄。將頭像移轉給下一任擁有者時，下一任擁有者可以看到前任的日誌內容。當你獲得一個頭像時，也獲得了這個頭像歷任擁有者共同創作的航行日誌。"}
                </p>
                <p>
                  {locale === Lang.en
                    ? "The logbook is part of Traveloggers, as well as the key to the collective memory of the Traveloggers’ owners."
                    : "航行日誌是 Traveloggers 身份的一部分，也是Traveloggers 擁有者的集體記憶密碼。"}
                </p>
              </Section.Content>
            </section>
          </section>
        </Container>
      </div>
    </section>
  )
}

export default Logbook
