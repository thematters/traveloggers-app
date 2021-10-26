import { useManualQuery, useMutation } from "graphql-hooks"
import React, { createContext, useState } from "react"

import env from "@/.env.json"

type Viewer = {
  id?: string
  displayName?: string
  userName?: string
  avatar?: string
  info: {
    cryptoWallet?: {
      id: string
      address: string
    }
  }
}

type Context = {
  viewer: Viewer
  loading: boolean
  error?: Error
  signIn: () => Promise<any>
  signOut: () => Promise<any>
  getViewer: () => Promise<any>
}

const GET_VIEWER = `
  query ViewerQuery {
    viewer {
      id
      displayName
      userName
      avatar
      info {
        cryptoWallet {
          id
          address
        }
      }
    }
  }
`

const SIGN_OUT_VIEWER = `
  mutation UserLogout {
    userLogout
  }
`

export const ViewerContext = createContext({} as Context)

export const ViewerConsumer = ViewerContext.Consumer

export const ViewerProvider = ({ children }: { children: React.ReactNode }) => {
  const [polling, setPolling] = useState(false)
  const [logout] = useMutation(SIGN_OUT_VIEWER)
  const [getViewer, { loading, error, data }] = useManualQuery(GET_VIEWER)
  const viewer = data?.viewer as Viewer

  const signIn = async () => {
    window.open(env.mattersLoginURL, "_blank")

    setPolling(true)

    const timer = setInterval(async () => {
      const { data: newData } = await getViewer()
      const newViewer = newData?.viewer as Viewer

      if (newViewer && newViewer.id) {
        setPolling(false)
        clearTimeout(timer)
      }
    }, 1000)
  }

  const signOut = async () => {
    await logout()
    await getViewer()
  }

  return (
    <ViewerContext.Provider
      value={{
        loading: loading || polling,
        error: error as Error,
        viewer,
        signIn,
        signOut,
        getViewer,
      }}
    >
      {children}
    </ViewerContext.Provider>
  )
}
