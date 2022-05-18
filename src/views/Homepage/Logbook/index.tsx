import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Button, Container, Section } from "~/components"
import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"
import { analytics } from "~/utils"

import RecentLogbooks from "./RecentLogbooks"
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
                  to="/logbooks/museum"
                  onClick={() =>
                    analytics("click_button", { type: "logbooks" })
                  }
                >
                  {locale === Lang.en ? "Logbook Museum" : "航行日誌收藏館"}
                </Button>
              </section>

              <section className={styles.description}>
                <Section.Content>
                  <p>
                    {locale === Lang.en
                      ? "Traveloggers is the first NFT social media avatar that comes with a logbook for owners to write on blockchain."
                      : "Traveloggers 可以向區塊鏈中寫下、並傳遞航行日誌。"}
                  </p>
                  <p>
                    {locale === Lang.en
                      ? "Each Traveloggers avatar could claim an unique logbook, on which the owner can write and transfer it to the successive owners. They can collaborate on a novel, a journalism piece, a manifesto, or something to-be-defined."
                      : "每個 Traveloggers 頭像隱藏了獨一無二的 Logbook（航行日誌本），每本都鑄造成的獨立的NFT，擁有者可以寫入日記、報導、宣言，圖輯，甚至發起共創，將此日誌透過贈與或販售，轉給下一位創作者，"}
                  </p>
                  <p>
                    {locale === Lang.en
                      ? "Each Logbook is a minted NFT that can be traded directly on marketplace, a mutually beneficial collaboration between content creators and collectors."
                      : "第一代 Logbook 直接存放在以太坊區塊鏈的主網，第二代Logbook則在Polygon主網上。"}
                  </p>
                  <p>
                    {locale === Lang.en
                      ? "While the first version of the Logbook were stored on the Ethereum Mainnet, Logbook 2.0 was launched on the Polygon."
                      : "Logbook 是 Traveloggers 身份的一部分，也是擁有者的集體記憶。"}
                  </p>
                </Section.Content>
              </section>
            </section>
          </section>

          <RecentLogbooks />
        </Container>
      </div>
    </section>
  )
}

export default Logbook
