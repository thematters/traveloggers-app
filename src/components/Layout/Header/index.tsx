import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"

import { Dialog, IconUser } from "~/components"
import { useDialogSwitch } from "~/hooks"

import * as styles from "./styles.module.css"

const Header = () => {
  const { show, openDialog, closeDialog } = useDialogSwitch(false)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header className={styles.header}>
      <Link to="/">Logo</Link>

      <section>
        <button type="button" onClick={openDialog}>
          <IconUser size="md" />
          Login
        </button>

        <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
          <Dialog.Header
            title={<span>hide</span>}
            closeDialog={closeDialog}
            mode="inner"
          />

          <Dialog.Content>Content</Dialog.Content>
        </Dialog>
      </section>
    </header>
  )
}

export default Header
