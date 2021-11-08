import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import { useMutation } from "graphql-hooks"
import { useContext, useState } from "react"

import env from "@/.env.json"
import { ViewerContext } from "~/components"
import { CryptoWalletSignaturePurpose, Lang, WalletErrorType } from "~/enums"
import { getAPIErrorMessage, getWalletErrorMessage } from "~/utils"

const PUT_WALLET = `
  mutation PutWallet($input: PutWalletInput!) {
    putWallet(input: $input) {
      id
      address
    }
  }
`

const DELETE_WALLET = `
  mutation DeleteWallet($input: DeleteWalletInput!) {
    deleteWallet(input: $input)
  }
`

export const useBinding = () => {
  const { locale } = useLocalization()
  const lang = locale as Lang

  const { account, library } = useWeb3React<ethers.providers.Web3Provider>()
  const [signing, setSigning] = useState(false)
  const [error, setError] = useState("")

  const { viewer, getViewer } = useContext(ViewerContext)
  const connectedWalletId = viewer?.info?.cryptoWallet?.id

  const [putWallet, { loading: binding, error: bindError }] =
    useMutation(PUT_WALLET)
  const [deleteWallet, { loading: unbinding, error: unbindError }] =
    useMutation(DELETE_WALLET)
  const bound = !!(viewer?.id && viewer?.info?.cryptoWallet?.id)

  // TODO: created nonce from server
  const signedMessage = `matters.news wants you to sign in with your Ethereum account:
${account}

URI: https://matters.news
Version: 1
Chain ID: ${env.supportedChainId}
Nonce: ${new Date().getTime()}
Issued At: ${new Date().toISOString()}`

  const bind = async ({ callback }: { callback: () => void }) => {
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
      const result = await putWallet({
        variables: {
          input: {
            ...(connectedWalletId ? { id: connectedWalletId } : {}),
            signature,
            signedMessage,
            address: account,
            purpose: CryptoWalletSignaturePurpose.connect,
          },
        },
      })

      // refresh viewer
      if (result.data) {
        await getViewer()
        setError("")
        callback()
      }
    } catch (err) {
      console.log(err)
    }

    setSigning(false)
  }

  const unbind = async ({ callback }: { callback: () => void }) => {
    if (!library || !account) {
      return
    }

    try {
      const result = await deleteWallet({
        variables: {
          input: { connectedWalletId },
        },
      })

      // refresh viewer
      if (result.data) {
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
    loading: unbinding || binding || signing,
    error,
    bindError:
      unbindError || bindError
        ? getAPIErrorMessage({ error: unbindError || bindError, lang })
        : "",
    bound,
    bind,
    unbind,
  }
}
