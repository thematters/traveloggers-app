import classNames from "classnames"
import React from "react"

import { IconCircleClose } from "~/components"

import * as styles from "./styles.module.css"

export interface HeaderProps {
  title: React.ReactNode
  closeDialog: () => void
}

const Header = ({ title, closeDialog }: HeaderProps) => {
  const headerClasses = classNames({
    [styles.header]: true,
  })

  return (
    <header className={headerClasses}>
      <h1>
        <span id="dialog-title">{title}</span>
      </h1>

      <section className={styles.left}>
        <button onClick={closeDialog} type="button">
          <IconCircleClose size="lg" />
        </button>
      </section>
    </header>
  )
}

export default Header
