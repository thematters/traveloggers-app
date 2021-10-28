import React from "react"

import { SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

type PageProps = {
  pageContext: {
    originalPath: string
  }
}

const NotFoundPage: React.FC<PageProps> = ({
  pageContext: { originalPath },
}) => (
  <>
    <SEO
      title={{
        [Lang.en]: "404: Not Found",
        [Lang.zh]: "404: 頁面不存在",
      }}
    />

    <Header originalPath={originalPath} />

    <main>
      <section className={styles.hero}>
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
    </main>

    <Footer />
  </>
)

export default NotFoundPage
