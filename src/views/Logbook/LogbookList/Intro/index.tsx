import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Section } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

const Intro = () => {
  const { locale } = useLocalization()

  return (
    <section className={styles.text}>
      <Section.Title>
        {locale === Lang.en ? "Record in your Logbook" : "寫下你的航行日誌"}
      </Section.Title>

      <Section.Content>
        <p>
          {locale === Lang.en ? (
            <>
              The owners of Traveloggers have the opportunities to record in the
              Logbook. The Logbook and its contents will be passed down to
              successive Travelogges owners.
            </>
          ) : (
            <>
              Traveloggers的擁有者，可以有一次機會寫下日誌。日誌本及其中的內容，將隨著
              Travelogges的所有權一起轉移
            </>
          )}
        </p>
        <p>
          {locale === Lang.en ? (
            <>
              Logbook 1.0 is stored on the Ethereum mainnet. An Ethereum miner
              fee(gas fee) is required when writing in the logbook.
            </>
          ) : (
            <>
              第一代日誌本保存在以太坊的主網。寫入日誌時需要繳納以太坊礦工費（Gas
              Fee）
            </>
          )}
        </p>
        <p>
          {locale === Lang.en ? (
            <>
              Please feel free to write down anything that can represent
              yourself or you want to express.
            </>
          ) : (
            <>請寫下你能代表自己，亦想向世界傳達的，最重要的文字</>
          )}
        </p>
      </Section.Content>
    </section>
  )
}

export default Intro
