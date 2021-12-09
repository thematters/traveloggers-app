import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Lang } from "~/enums"
import { useAccount } from "~/hooks"
import { maskAddress } from "~/utils"

import * as styles from "./styles.module.css"

type PageProps = {
  owner: string
}

const TitleBar: React.FC<PageProps> = ({ owner }) => {
  const { account } = useAccount()
  const { locale } = useLocalization()

  const isSameAccount =
    owner && account && owner.toLowerCase() === account.toLowerCase()

  return (
    <section>
      <h2 className={styles.title}>
        <hr />
        <span>
          {locale === Lang.en
            ? isSameAccount
              ? "My "
              : `${owner ? maskAddress(owner) : ""}'s `
            : isSameAccount
            ? "我的"
            : `${owner ? maskAddress(owner) : ""} 的`}
          {locale === Lang.en ? "Collection" : "收藏"}
        </span>
        <hr />
      </h2>
    </section>
  )
}

export default TitleBar
