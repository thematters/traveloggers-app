import React from "react"

import { SEO } from "~/components"
import { LANG } from "~/enums"

import * as styles from "./styles.module.css"

const NotFoundPage = () => (
  <>
    <SEO
      title={{
        [LANG.en]: "404: Not Found",
        [LANG.zhHant]: "404: 頁面不存在",
        [LANG.zhHans]: "404: 页面不存在",
      }}
    />

    <section
      className={styles.hero}
      style={{ backgroundImage: `url(/images/hero.jpg)` }}
    >
      <div className="l-container">
        <div className="l-row">
          <div className="l-col-full">
            <div className={styles.content}>
              <h1 className={styles.title}>Not Found</h1>

              <p className={styles.intro}>
                You just hit a route that doesn&#39;t exist... the sadness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)

export default NotFoundPage
