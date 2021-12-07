import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Button, LinkAccountDialog,Section } from "~/components"
import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"
import { analytics } from "~/utils"

import * as styles from "./styles.module.css"

const Intro = () => {
  const { locale } = useLocalization()
  const isMediumUp = useResponsive("md-up")

  return (
    <section className={styles.container}>
      <section className={styles.text}>
        <Section.Title>
          {locale === Lang.en ? "Record in your Logbook" : "寫下你的航行日誌"}
        </Section.Title>

        <Section.Content>
          <p>
            {locale === Lang.en ? (
              <>
                The owners of Traveloggers have the opportunities to record in
                the Logbook. The Logbook and its contents will be passed down to
                successive Travelogges owners.
              </>
            ) : (
              <>
                Traveloggers
                的擁有者，可以有一次機會寫下日誌。日誌本及其中的內容，將隨著
                Travelogges 的所有權一起轉移。
              </>
            )}
          </p>
          <p>
            {locale === Lang.en ? (
              <>
                Feel free to write down anything that represents you or you want
                to express.
              </>
            ) : (
              <>請寫下你能代表自己，亦想向世界傳達的，最重要的文字。</>
            )}
          </p>
        </Section.Content>
      </section>

      <section className={styles.buttons}>
        <LinkAccountDialog defaultStep="connect-wallet">
          {({ openDialog }) => (
            <Button
              color="golden"
              width={isMediumUp ? "12.5rem" : "100%"}
              spacingY="0.75rem"
              onClick={() => {
                analytics("click_button", {
                  type: "logbooks_connect_wallet",
                })
                openDialog()
              }}
            >
              {locale === Lang.en ? "Login" : "登錄"}
            </Button>
          )}
        </LinkAccountDialog>

        <Button
          color="greyBack"
          width={isMediumUp ? "12.5rem" : "100%"}
          spacingY="0.75rem"
          to="/logbooks/museum"
        >
          Logbook Museum
        </Button>
      </section>
    </section>
  )
}

export default Intro
