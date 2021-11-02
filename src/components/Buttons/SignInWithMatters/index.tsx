import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext, useEffect } from "react"

import {
  Avatar,
  CardButton,
  Dialog,
  IconArrowRight,
  IconChecked,
  IconSpinner,
  IconUser,
  TextIcon,
  ViewerContext,
} from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

export const SignInWithMatters = () => {
  const { locale } = useLocalization()

  const { viewer, loading, error, signIn, stopPolling, signOut } =
    useContext(ViewerContext)

  useEffect(() => {
    stopPolling()
  }, [])

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
                  {locale === Lang.en ? "Edit" : "變更"}
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
    <>
      <CardButton
        title={
          locale === Lang.en ? "Sign In with Matters" : "請登入 Matters 帳戶"
        }
        leftIcon={<IconUser size="xlM" />}
        right={loading ? <IconSpinner /> : <IconArrowRight />}
        onClick={signIn}
        disabled={loading || !!error}
      />
      {loading && (
        <Dialog.Message type="info">
          <p>
            {locale === Lang.en
              ? "Please complete the sign in on new tab."
              : "請在新頁面完成登入"}
          </p>
        </Dialog.Message>
      )}
    </>
  )
}
