import classNames from "classnames"
import React, { useEffect } from "react"

import env from "@/.env.json"
import { Container, SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import { useResponsive } from "~/hooks"
import { analytics } from "~/utils"

import * as styles from "./styles.module.css"

export interface ContainerProps {
  header: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  page?: "listWelcome" | "detail"
}

export const LogbookLayout: React.FC<ContainerProps> = ({
  header,
  footer,
  page,
  children,
}) => {
  const isMediumUp = useResponsive("md-up")
  const isLargeUp = useResponsive("lg-up")

  useEffect(() => {
    import("firebase/app").then(({ initializeApp }) => {
      initializeApp(env.firebase)
      analytics("page_view")
    })
  }, [])

  return (
    <>
      <SEO />

      {isMediumUp && <Header originalPath={"/logbooks"} />}

      <main
        className={classNames({
          [styles.main]: true,
          ...(page ? { [styles[page]]: !!page } : {}),
        })}
      >
        <div className={styles.outer}>
          <Container>
            <div className={styles.container}>
              <div className={styles.inner}>
                <header className={styles.header}>{header}</header>
                <section className={styles.content}>{children}</section>
              </div>
            </div>
          </Container>
          {footer}
        </div>

        {isLargeUp && (
          <section className={styles.footer}>
            <Footer />
          </section>
        )}
      </main>
    </>
  )
}
