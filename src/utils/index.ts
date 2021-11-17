export * from "./analytics"
export * from "./api"
export * from "./datetime"
export * from "./dom"
export * from "./openSea"
export * from "./wallet"

export const preloadImages = (urls: string[]) => {
  for (let i = 0; i < urls.length; i++) {
    const img = new Image()
    img.src = urls[i]
  }
}

export const sleep = async (ms: number) => {
  await new Promise(resolve => setTimeout(resolve, ms))
}
