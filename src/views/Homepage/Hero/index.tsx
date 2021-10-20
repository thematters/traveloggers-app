import React from "react"

import { Button } from "~/components"

import * as styles from "./styles.module.css"

const Hero = () => {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(/images/hero.png)` }}
    >
      <div className="l-container">
        <div className="l-row">
          <div className="l-col-full">
            <div className={styles.content}>
              <h1 className={styles.title}>Travelogers</h1>

              <h3 className={styles.subtitle}>
                馬特宇宙，來源於銀河宇宙的一次革命，一次離鄉的征途
              </h3>

              <p className={styles.intro}>
                CryptoMatties 是 Matters 發行的通向馬特宇宙的 1500 個遠航者 NFT
                Avatar，是馬特宇宙的遠航者標誌。 Avatar
                的擁有者將會踏上馬特宇宙，開始新世界的探索征途。
              </p>

              <section className={styles.cta}>
                <Button
                  color="primary"
                  width="100%"
                  height="3.5rem"
                  spacingY="1rem"
                >
                  查看前傳故事
                </Button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
