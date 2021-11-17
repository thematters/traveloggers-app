import React, { useEffect } from "react"

import env from "@/.env.json"
import { Container, SEO } from "~/components"
import Header from "~/components/Layout/Header"
import { useResponsive } from "~/hooks"
import { analytics } from "~/utils"

import * as styles from "./styles.module.css"

export interface ContainerProps {
  header: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}

export const LogbookLayout: React.FC<ContainerProps> = ({
  header,
  footer,
  children,
}) => {
  const isMediumUp = useResponsive("md-up")

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

      <main className={styles.main}>
        <div className={styles.outer}>
          <Container>
            <div className={styles.container}>
              <div className={styles.inner}>
                <header className={styles.header}>{header}</header>
                <section className={styles.content}>{children}</section>
                {footer}
              </div>
            </div>
          </Container>
        </div>
      </main>

      {/* {isMediumUp && <Footer />} */}
    </>
  )
}
