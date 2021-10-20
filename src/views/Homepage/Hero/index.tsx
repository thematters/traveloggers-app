import * as React from "react"

import { Button } from "~/components"

import * as styles from "./styles.module.css"

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="l-container">
        <div className="l-row">
          <div className="l-col-full">
            <h1>CryptoMatties</h1>

            <h3>馬特宇宙，來源於銀河宇宙的一次革命，一次離鄉的征途</h3>

            <p>
              CryptoMatties 是 Matters 發行的通向馬特宇宙的 1500 個遠航者 NFT
              Avatar，是馬特宇宙的遠航者標誌。 Avatar
              的擁有者將會踏上馬特宇宙，開始新世界的探索征途。
            </p>

            <Button
              color="primary"
              width="22.5rem"
              height="3.5rem"
              spacingY="1rem"
            >
              查看前傳故事
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
