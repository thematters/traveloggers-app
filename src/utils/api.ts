import { APIError } from "graphql-hooks"

import { Lang } from "~/enums"

enum APIErrorCode {
  BAD_USER_INPUT = "BAD_USER_INPUT",
  UNAUTHENTICATED = "UNAUTHENTICATED",
  FORBIDDEN = "FORBIDDEN",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  CRYPTO_WALLET_EXISTS = "CRYPTO_WALLET_EXISTS",
  ENTITY_NOT_FOUND = "ENTITY_NOT_FOUND",
}

export const getErrorCodes = (error?: APIError<any>): APIErrorCode[] => {
  const errorCodes: APIErrorCode[] = []

  if (!error || !error.graphQLErrors) {
    return errorCodes
  }

  error.graphQLErrors.forEach(e => {
    const code = e.extensions?.code
    if (code) {
      errorCodes.push(code)
    }
  })

  return errorCodes
}

const API_ERROR_MESSAGES = {
  [Lang.en]: {
    [APIErrorCode.BAD_USER_INPUT]: "Invalid address or signature.",
    [APIErrorCode.CRYPTO_WALLET_EXISTS]:
      "This wallet or Matters acccount already had registered for airdrop, please use another wallet or account.",
    [APIErrorCode.ENTITY_NOT_FOUND]: "Wallet address not found.",
    [APIErrorCode.INTERNAL_SERVER_ERROR]:
      "An unknown error occurred, please make sure your wallet and network are in working.",
    [APIErrorCode.UNAUTHENTICATED]:
      "Please sign in with Matters account first.",
    [APIErrorCode.FORBIDDEN]:
      "You are currently not allowed to do this action.",
  },
  [Lang.zh]: {
    [APIErrorCode.BAD_USER_INPUT]: "錢包地址或簽名不正確",
    [APIErrorCode.CRYPTO_WALLET_EXISTS]:
      "此錢包或 Matters 帳戶已有參與空投，請變更以繼續操作",
    [APIErrorCode.ENTITY_NOT_FOUND]: "錢包地址不存在",
    [APIErrorCode.INTERNAL_SERVER_ERROR]:
      "發生未知錯誤，請確保你的錢包和網絡正常",
    [APIErrorCode.UNAUTHENTICATED]: "請先登入 Matters 帳戶",
    [APIErrorCode.FORBIDDEN]: "暫時無法執行此操作",
  },
}

export const getAPIErrorMessage = ({
  error,
  lang,
}: {
  error?: APIError<any>
  lang: Lang
}) => {
  const codes = getErrorCodes(error)

  const code = codes[0]

  return (
    API_ERROR_MESSAGES[lang][code] ||
    API_ERROR_MESSAGES[lang].INTERNAL_SERVER_ERROR
  )
}
