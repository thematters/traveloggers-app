import React from "react"

import { useAccount } from "~/hooks"
import { maskAddress } from "~/utils"

import * as styles from "./styles.module.css"

type PageProps = {
  owner: string
}

const TitleBar: React.FC<PageProps> = ({ owner }) => {
  const { account } = useAccount()

  const isSameAccount =
    owner && account && owner.toLowerCase() === account.toLowerCase()

  return (
    <section>
      <h2 className={styles.title}>
        <hr />
        {isSameAccount ? "My" : `${owner ? maskAddress(owner) : ""}'s`}&nbsp;
        Collection
        <hr />
      </h2>
    </section>
  )
}

export default TitleBar
