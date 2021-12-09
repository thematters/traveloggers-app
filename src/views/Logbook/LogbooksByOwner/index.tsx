import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext, useEffect } from "react"

import { Button, Logbook, LogbookLayout, Spinner } from "~/components"
import { LogbookContext } from "~/components"
import { Lang } from "~/enums"
import { useResponsive } from "~/hooks"

import HeaderBar from "../LogbookList/HeaderBar"
import Logbooks from "../LogbookList/Logbooks"
import * as styles from "./styles.module.css"
import TitleBar from "./TitleBar"

type PageProps = {
  owner: string
  originalPath: string
}

const LogbooksByOwner: React.FC<PageProps> = ({ owner, originalPath }) => {
  const { getOwnNFTs, logbooks, ownNFTs } = useContext(LogbookContext)
  const { locale } = useLocalization()

  const isMediumUp = useResponsive("md-up")

  useEffect(() => {
    getOwnNFTs(owner)
  }, [owner])

  const ownLogbooks = ownNFTs.tokenIds
    .map(tokenId => logbooks[tokenId])
    .filter(l => !!l)

  if (ownNFTs.loading) {
    return (
      <LogbookLayout
        page="list"
        header={<HeaderBar />}
        headerBar={<TitleBar owner={owner} />}
      >
        <Spinner />
      </LogbookLayout>
    )
  }

  return (
    <LogbookLayout
      page="list"
      header={<HeaderBar />}
      headerBar={<TitleBar owner={owner} />}
    >
      <Logbooks logbooks={ownLogbooks as Logbook[]} showOwner={false} />

      <section className={styles.footerBtn}>
        <Button
          color="golden"
          width={isMediumUp ? "12.5rem" : "100%"}
          spacingY="0.75rem"
          to="/logbooks/museum"
        >
          {locale === Lang.en ? "Logbook Museum" : "航行日誌收藏館"}
        </Button>
      </section>
    </LogbookLayout>
  )
}

export default LogbooksByOwner
