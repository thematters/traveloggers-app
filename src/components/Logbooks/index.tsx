import React, { useEffect } from "react"

import env from "@/.env.json"
import { LogbookProvider, SEO } from "~/components"
import Footer from "~/components/Layout/Footer"
import Header from "~/components/Layout/Header"
import { useResponsive } from "~/hooks"
import { analytics } from "~/utils"

import * as styles from "./styles.module.css"

export interface ContainerProps {
  headerBar: React.ReactNode
  children: React.ReactNode
}

export const LogbooksContainer: React.FC<ContainerProps> = ({
  headerBar,
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
    <LogbookProvider>
      <SEO />

      {isMediumUp && <Header originalPath={"/logbooks"} />}

      <main className={styles.main}>
        <section className={styles.header}></section>
        <section className={styles.left}></section>
        <section className={styles.right}></section>
        <section className={styles.toolbarHeader}>{headerBar}</section>
        <section className={styles.content}>{children}</section>
        <section className={styles.footer}></section>
      </main>

      {isMediumUp && <Footer />}
    </LogbookProvider>
  )
}
