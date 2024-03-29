import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import { useMutation } from "graphql-hooks"
import { useContext, useState } from "react"

import env from "@/.env.json"
import { ViewerContext } from "~/components"
import { CryptoWalletSignaturePurpose, Lang, WalletErrorType } from "~/enums"
import { getAPIErrorMessage, getWalletErrorMessage } from "~/utils"

const REGISTER_AIRDROP = `
  mutation RegisterAirdrop($input: PutWalletInput!) {
    putWallet(input: $input) {
      id
      address
    }
  }
`

export const useAirdrop = () => {
  const { locale } = useLocalization()
  const lang = locale as Lang

  const { account, library } = useWeb3React<ethers.providers.Web3Provider>()
  const [signing, setSigning] = useState(false)
  const [error, setError] = useState("")

  const { viewer, getViewer } = useContext(ViewerContext)
  const connectedWalletId = viewer?.info?.cryptoWallet?.id

  const [register, { loading, error: registerError }] =
    useMutation(REGISTER_AIRDROP)
  const registered = !!(viewer?.id && viewer?.info?.cryptoWallet?.id)

  // TODO: created nonce from server
  const signedMessage = `https://matters.town wants you to sign in with your Ethereum account:
${account}

URI: https://matters.town
Version: 1
Chain ID: ${env.supportedChainId}
Nonce: ${new Date().getTime()}
Issued At: ${new Date().toISOString()}`

  const registerAirdrop = async ({ callback }: { callback: () => void }) => {
    if (!library || !account) {
      return
    }

    setSigning(true)

    const signer = library.getSigner()
    // sign message
    let signature = ""
    try {
      signature = await signer.signMessage(signedMessage)
    } catch (err) {
      console.log(err)
      setError(
        getWalletErrorMessage({
          type: WalletErrorType.userRejectedSignMessage,
          lang,
        })
      )
      setSigning(false)
      return
    }

    try {
      // register airdrop
      const result = await register({
        variables: {
          input: {
            ...(connectedWalletId ? { id: connectedWalletId } : {}),
            signature,
            signedMessage,
            address: account,
            purpose: CryptoWalletSignaturePurpose.airdrop,
          },
        },
      })

      // refresh viewer
      if (result.data?.putWallet?.id) {
        await getViewer()
        setError("")
        callback()
      }
    } catch (err) {
      console.log(err)
    }

    setSigning(false)
  }

  return {
    loading: loading || signing,
    error,
    registerError: registerError
      ? getAPIErrorMessage({ error: registerError, lang })
      : "",
    registered,
    registerAirdrop,
  }
}
