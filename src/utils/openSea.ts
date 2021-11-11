import axios from "axios"
import queryString from "query-string"

import env from "@/.env.json"

const OPENSEA_API_BASE_URL =
  env.env === "development"
    ? "https://rinkeby-api.opensea.io/api/v1"
    : "https://api.opensea.io/api/v1"

type OpenSeaAsset = {
  token_id: string
}

export const retrieveOwnerNFTs = async ({ owner }: { owner: string }) => {
  const contractAddress = env.contractAddress

  const qs = queryString.stringify({
    owner,
    asset_contract_address: contractAddress,
    order_direction: "desc",
    offset: 0,
    limit: 50, // TODO: pagination support
  })
  const url = `${OPENSEA_API_BASE_URL}/assets?${qs}`

  const result = await axios.get(url)

  return (result?.data?.assets || []) as OpenSeaAsset[]
}

export const toOpenSeaNFTUrl = (tokenId: string) => {
  return env.env === "development"
    ? `https://testnets.opensea.io/assets/${env.contractAddress}/${tokenId}`
    : `https://opensea.io/assets/${env.contractAddress}/${tokenId}`
}
