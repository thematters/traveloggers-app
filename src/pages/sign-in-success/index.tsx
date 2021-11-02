import { useLocalization } from "gatsby-theme-i18n"
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

const SignInSuccess: React.FC<PageProps> = ({
  pageContext: { originalPath },
}) => {
  const { locale } = useLocalization()
  const lang = locale as Lang

  return (
    <>
      <SEO
        title={{
          [Lang.en]: "Sign In Successful",
          [Lang.zh]: "登入成功",
        }}
      />

      <Header originalPath={originalPath} />

      <main>
        <section className={styles.container}>
          <div className="l-container">
            <div className="l-row">
              <div className="l-col-full">
                <div>
                  <MessageBox
                    title="Success"
                    description={
                      lang === Lang.en
                        ? "You have already signed in with Matters, please go back to the previous page to continue the operation."
                        : "你已成功以登入 Matters，請回到前頁繼續操作"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default SignInSuccess
