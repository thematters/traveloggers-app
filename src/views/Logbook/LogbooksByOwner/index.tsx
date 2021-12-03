import React, { useContext, useEffect } from "react"

import { Logbook, LogbookLayout, Spinner } from "~/components"
import { LogbookContext } from "~/components"

// import { useAccount } from "~/hooks"
import HeaderBar from "../LogbookList/HeaderBar"
import Logbooks from "../LogbookList/Logbooks"
import TitleBar from "./TitleBar"

type PageProps = {
  owner: string
  originalPath: string
}

const LogbooksByOwner: React.FC<PageProps> = ({ owner, originalPath }) => {
  // const { account } = useAccount()
  const { getOwnNFTs, logbooks, ownNFTs } = useContext(LogbookContext)

  useEffect(() => {
    getOwnNFTs(owner)
  }, [owner])

  const ownLogbooks = ownNFTs.tokenIds
    // .filter(tokenId => tokenId in logbooks)
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
      // headerBar={<SearchBar onSearch={onSearch} />}
      headerBar={<TitleBar owner={owner} />}
    >
      <Logbooks
        logbooks={ownLogbooks as Logbook[]}
        skipShowOwnerIfOwnedBy={owner}
      />
      {/* <pre>{JSON.stringify({ owner, account })}</pre> */}
    </LogbookLayout>
  )
}

export default LogbooksByOwner
