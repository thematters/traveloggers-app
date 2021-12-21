import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext } from "react"

import { Button, LogbookContext, Spinner, TransferDialog } from "~/components"
import { Lang } from "~/enums"
import { useAccount } from "~/hooks"

import LogList from "../LogList"
import * as styles from "./styles.module.css"

type ContentProps = {
  tokenId: string
}

const Content: React.FC<ContentProps> = ({ tokenId }) => {
  const { logbooks } = useContext(LogbookContext)
  const { account } = useAccount()
  const { locale } = useLocalization()

  const logbook = logbooks[tokenId]
  const isOwner = logbook?.tokenOwner === account

  if (logbook?.loading) {
    return (
      <section className={styles.content}>
        <Spinner />
      </section>
    )
  }

  if (logbook?.error) {
    return (
      <section className={styles.content}>
        <section className={styles.card}>{logbook.error}</section>
      </section>
    )
  }

  if (!logbook) {
    return (
      <section className={styles.content}>
        <section className={styles.card}>Logbook does not exists.</section>
      </section>
    )
  }

  return (
    <section className={styles.content}>
      <LogList logs={logbook.logs} />

      {isOwner && (
        <section className={styles.footerBtn}>
          <TransferDialog tokenId={logbook.tokenId}>
            {({ openDialog }) => (
              <Button
                color="golden"
                width="100%"
                spacingY="0.75rem"
                onClick={openDialog}
              >
                {locale === Lang.en
                  ? "Transfer Travelogger"
                  : "贈送 Travelogger"}
              </Button>
            )}
          </TransferDialog>
        </section>
      )}
    </section>
  )
}

export default Content
