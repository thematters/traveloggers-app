import classNames from "classnames"
import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Container, Section } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

const Benefits = () => {
  const { locale } = useLocalization()
  const subtitleStyles = { customStyles: { paddingTop: "1.5rem" } }
  const contentStyles = { customStyles: { paddingTop: "0.5rem" } }

  const containerClasses = classNames({
    [styles.benefits]: true,
  })

  return (
    <section className={containerClasses}>
      <Container>
        <Section.Title>
          {locale === Lang.en
            ? "Uniqueness & Benefits of Avatar"
            : "Avatar 獨特性"}
        </Section.Title>
        <Section.Content customStyles={{ paddingTop: "1rem" }}>
          {locale === Lang.en
            ? `The owner of Traveloggers can log in to Matters’ account, and instantly change the profile picture on the personal homepage to your own avatar. Owners of Traveloggers can also enjoy:`
            : `Traveloggers 擁有使用 Matters 的完整權限。同時，他還擁有：`}
        </Section.Content>

        <Section.Subtitle {...subtitleStyles}>
          {locale === Lang.en ? "Full Copyrights" : "完整版權"}
        </Section.Subtitle>
        <Section.Content {...contentStyles}>
          {locale === Lang.en
            ? "All copyrights of the NFT belong to the owner of the NFT after sale."
            : "NFT（Traveloggers + Logbook）的所有版權在生成之後，歸NFT擁有者所有。"}
        </Section.Content>

        <Section.Subtitle {...subtitleStyles}>
          {locale === Lang.en ? "Story Co-creation" : "參與故事共創"}
        </Section.Subtitle>
        <Section.Content {...contentStyles}>
          {locale === Lang.en
            ? "The Matterverse story has just started. The future direction, construction of the universe, and the character building will all be co-created by the owners. More NFT plans such as the Matterverse story series will also be launched in the future, which Traveloggers owners can participate in and will receive benefits such as airdrops."
            : "馬特宇宙的故事剛剛啟動，未來的多元走向，宇宙建設，人物發展，不同故事線的生長都會由持有者一起來共創。Traveloggers 可優先參與其中，並獲得未來NFT計畫的空投福利。"}
        </Section.Content>

        <Section.Subtitle {...subtitleStyles}>
          {locale === Lang.en
            ? "Ecosystem Co-building and Benefits"
            : "生態共建和福利"}
        </Section.Subtitle>
        <Section.Content {...contentStyles}>
          {locale === Lang.en
            ? "...(TBD)..."
            : `Traveloggers 是馬特宇宙 Web3 治理實驗的入場券。馬特宇宙的居民相信，Web3 不只關於數字資產的保障、個人數據的權利，也是一次互聯網公共治理的革命。Traveloggers會`}
        </Section.Content>
      </Container>
    </section>
  )
}

export default Benefits
