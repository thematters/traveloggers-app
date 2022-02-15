import { ethers } from "ethers"

import env from "@/.env.json"

import type { OpenSeaAsset } from "./openSea"

const ALCHEMY_API_BASE_URL = env.alchemyEndpointURL

export const retrieveOwnerNFTs = async ({ owner }: { owner: string }) => {
  const contractAddress = env.contractAddress

  const searchParams = new URLSearchParams({
    owner,
    "contractAddresses[]": contractAddress,
    withMetadata: "true",
  })

  const url = `${ALCHEMY_API_BASE_URL}/getNFTs/?${searchParams.toString()}`

  const result = await fetch(url).then(res => res.json())

  // response example in https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/getnfts

  return (result?.ownedNfts || []).map(
    (nft: {
      id: { tokenId: string }
      media: Array<{ uri: { raw: string; gateway: string } }>
    }) => {
      const imageLink = nft?.media?.[0]?.uri?.gateway as string
      return {
        token_id: ethers.BigNumber.from(nft.id.tokenId).toNumber().toString(),
        permalink: imageLink,
        image_preview_url: imageLink,
        owner: { address: owner },
      }
    }
  ) as OpenSeaAsset[]
}
