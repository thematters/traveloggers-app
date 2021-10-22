import classNames from "classnames"
import React from "react"

import { Container, Section } from "~/components"
import { useResponsive } from "~/hooks"

import * as styles from "./styles.module.css"

const Benefits = () => {
  const isMediumUp = useResponsive("md-up")
  const subtitleStyles = { customStyles: { paddingTop: "1.5rem" } }
  const contentStyles = { customStyles: { paddingTop: "0.5rem" } }

  const containerClasses = classNames({
    [styles.benefits]: true,
    [styles.spacing_md_up]: isMediumUp,
  })

  return (
    <section
      className={containerClasses}
      style={{ backgroundImage: `url(/images/benefits.png)` }}
    >
      <Container>
        <Section.Title>Avatar 獨特性</Section.Title>
        <Section.Content customStyles={{ paddingTop: "1rem" }}>
          Traveloggers 的擁有者可以登入
          Matters，在個人主頁可以立即將個人頭像換成屬於你專屬的 Avatar。作為
          Traveloggers 的擁有者，還意味著擁有：
        </Section.Content>

        <Section.Subtitle {...subtitleStyles}>完整版權</Section.Subtitle>
        <Section.Content {...contentStyles}>
          NFT的所有版權在發售之後歸NFT擁有者所有。
        </Section.Content>

        <Section.Subtitle {...subtitleStyles}>參與故事共創</Section.Subtitle>
        <Section.Content {...contentStyles}>
          馬特宇宙的故事才剛剛啟動，未來的走向，宇宙建設，人物發展，都會由持有者一起來共創。接下來還會推出馬特宇宙故事系列等不同的NFT等計劃。Traveloggers持有者都可以參與其中，並且會獲得空投等福利。
        </Section.Content>

        <Section.Subtitle {...subtitleStyles}>生態共建和福利</Section.Subtitle>
        <Section.Content {...contentStyles}>
          Traveloggers不僅僅是一個 NFT 的
          Avatar，它還意味著Web3創作者社區的入場券。Matters 期望打造成為 Web3
          世界的最大創作者社群。Avatar 持有者將會解鎖 Matters
          為創作者打造的升級功能和享受福利，如未來 Matters 為創作者配備 ENS
          的個人主頁，NFT眾籌等功能以及參與到未來生態Token的發行中。
        </Section.Content>
      </Container>
    </section>
  )
}

export default Benefits
