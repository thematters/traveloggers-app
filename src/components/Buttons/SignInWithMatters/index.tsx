import React, { useContext } from "react"

import env from "@/.env.json"
import {
  Avatar,
  CardButton,
  IconArrowRight,
  IconChecked,
  IconSpinner,
  IconUser,
  TextIcon,
  ViewerContext,
} from "~/components"

import * as styles from "./styles.module.css"

export const SignInWithMatters = () => {
  const { viewer, loading, error, signIn, signOut } = useContext(ViewerContext)

  if (viewer && viewer.id) {
    return (
      <CardButton
        title={viewer.displayName}
        subtitle={`@${viewer.userName}`}
        leftIcon={<Avatar src={viewer.avatar} />}
        right={
          loading ? (
            <IconSpinner />
          ) : (
            <div className={styles.change}>
              <div role="button" onClick={signOut}>
                <TextIcon underline size="xs">
                  變更
                </TextIcon>
              </div>
              <IconChecked size="mdS" />
            </div>
          )
        }
        disabled={loading || !!error}
      />
    )
  }

  return (
    <CardButton
      title="請登入 Matters 帳戶"
      leftIcon={<IconUser size="xlM" />}
      right={loading ? <IconSpinner /> : <IconArrowRight />}
      htmlHref={env.mattersLoginURL}
      htmlTarget="_blank"
      onClick={signIn}
      disabled={loading || !!error}
    />
  )
}
