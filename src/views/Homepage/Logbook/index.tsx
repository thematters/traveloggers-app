import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Button, Container, Section } from "~/components"
import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"
import { analytics } from "~/utils"

import * as styles from "./styles.module.css"

const Logbook = () => {
  const { locale } = useLocalization()
  const isMediumUp = useResponsive("md-up")

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

              <section className={styles.button}>
                <Button
                  // disabled={!isOpenSaleActive}
                  color="primary"
                  width={isMediumUp ? "12.5rem" : "100%"}
                  spacingY="0.75rem"
                  to="/logbooks"
                  onClick={() =>
                    analytics("click_button", { type: "logbooks" })
                  }
                >
                  {locale === Lang.en ? "View Logbooks" : "查看日誌"}
                </Button>
              </section>

              <section className={styles.description}>
                <Section.Content>
                  <p>
                    {locale === Lang.en
                      ? "Traveloggers can record their journey on blockchain and pass the logbook to  successive Traveloggers’ owners."
                      : "Traveloggers 可以向區塊鏈中寫下、並傳遞航行日誌。"}
                  </p>
                  <p>
                    {locale === Lang.en
                      ? "Each Travelogger avatar comes with a unique logbook, on which only the owner can record once. When the avatar is passed on to the next owner, the next owner can review and own all the former log contents."
                      : "每個 Traveloggers 頭像隱藏了獨一無二的 Logbook（航行日誌本），只有擁有者可以向其中添加一次紀錄。當 Traveloggers 將頭像移轉給新的主人時，Logbook  的所有權也一併移轉。當你在擁有一個頭像時，你也擁有這個頭像的歷任擁有者所共同創作的航海日誌。"}
                  </p>
                  <p>
                    {locale === Lang.en
                      ? "The first version of the Logbook will be stored on the Ethereum Mainnet directly. The Logbook is part of Traveloggers, as well as the collective memory of the Traveloggers’ owner."
                      : "第一代 Logbook 直接存放在以太坊區塊鏈的主網。它是 Traveloggers 身份的一部分，也是擁有者的集體記憶。"}
                  </p>
                </Section.Content>
              </section>
            </section>
          </section>
        </Container>
      </div>
    </section>
  )
}

export default Logbook
