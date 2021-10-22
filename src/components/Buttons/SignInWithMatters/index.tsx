import { useManualQuery, useMutation } from "graphql-hooks"
import React, { useEffect, useState } from "react"

import {
  Avatar,
  CardButton,
  IconArrowRight,
  IconChecked,
  IconSpinner,
  IconUser,
  TextIcon,
} from "~/components"

import * as styles from "./styles.module.css"

const GET_VIEWER = `
  query ViewerQuery {
    viewer {
      id
      displayName
      userName
      avatar
    }
  }
`

const LOGOUT_VIEWER = `
  mutation UserLogout {
    userLogout
  }
`

export const SignInWithMatters = () => {
  const [polling, setPolling] = useState(false)
  const [logout] = useMutation(LOGOUT_VIEWER)
  const [fetchViewer, { loading, error, data }] = useManualQuery(GET_VIEWER)
  const viewer = data?.viewer

  // TODO: error handling

  // init fetch on mount
  useEffect(() => {
    fetchViewer()
  }, [])

  // polling on signing in
  useEffect(() => {
    if (!polling) {
      return
    }

    const timer = setInterval(async () => {
      const { data: newData } = await fetchViewer()
      const newViewer = newData?.viewer

      if (newViewer && newViewer.id) {
        setPolling(false)
        clearTimeout(timer)
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [polling])

  if (viewer && viewer.id) {
    return (
      <CardButton
        title={viewer.displayName}
        subtitle={`@${viewer.userName}`}
        leftIcon={<Avatar src={viewer.avatar} />}
        right={
          polling || loading ? (
            <IconSpinner />
          ) : (
            <div className={styles.change}>
              <button
                onClick={async () => {
                  await logout()
                  await fetchViewer()
                }}
              >
                <TextIcon underline size="xs">
                  變更
                </TextIcon>
              </button>
              <IconChecked size="mdS" />
            </div>
          )
        }
        disabled={polling || loading}
      />
    )
  }

  return (
    <CardButton
      title="請登入 Matters 帳戶"
      leftIcon={<IconUser size="xlM" />}
      right={polling || loading ? <IconSpinner /> : <IconArrowRight />}
      htmlHref="https://web-develop.matters.news/login"
      htmlTarget="_blank"
      onClick={() => setPolling(true)}
      disabled={polling || loading}
    />
  )
}
