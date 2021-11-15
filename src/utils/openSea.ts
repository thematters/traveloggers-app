import env from "@/.env.json"

const OPENSEA_API_BASE_URL =
  env.env === "development"
    ? "https://rinkeby-api.opensea.io/api/v1"
    : "https://api.opensea.io/api/v1"

type OpenSeaAsset = {
  token_id: string
  permalink: string
  image_preview_url: string
  owner: {
    address: string
  }
}

export const retrieveOwnerNFTs = async ({ owner }: { owner: string }) => {
  const contractAddress = env.contractAddress

  const searchParams = new URLSearchParams({
    owner,
    asset_contract_address: contractAddress,
    order_direction: "desc",
    offset: "0",
    limit: "50", // TODO: pagination support
  })

  const url = `${OPENSEA_API_BASE_URL}/assets?${searchParams.toString()}`

  const result = await fetch(url).then(res => res.json())

  return (result?.assets || []) as OpenSeaAsset[]
}

export const retrieveNFT = async ({ tokenId }: { tokenId: string }) => {
  const contractAddress = env.contractAddress

  const url = `${OPENSEA_API_BASE_URL}/asset/${contractAddress}/${tokenId}`

  const result = await fetch(url).then(res => res.json())

  return result as OpenSeaAsset
}
