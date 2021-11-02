import React from "react"

import { MessageBox, SEO } from "~/components"
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
      <section className={styles.container}>
        <div className="l-container">
          <div className="l-row">
            <div className="l-col-full">
              <MessageBox
                title="Not Found"
                description="You just hit a route that doesn&#39;t exist... the sadness."
              />
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </>
)

export default NotFoundPage
