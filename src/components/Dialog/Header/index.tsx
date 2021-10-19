import VisuallyHidden from "@reach/visually-hidden"
import classNames from "classnames"
import React from "react"

import { CloseButton } from "./Button"
import * as styles from "./styles.module.css"

export interface HeaderProps {
  title: React.ReactNode
  closeDialog?: () => void
  mode?: "hidden" | "inner"
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode | string
}

const BaseHeader = ({
  title,
  closeDialog,
  mode,
  leftButton,
  rightButton,
}: HeaderProps) => {
  const headerClasses = classNames({
    [styles.header]: true,
    [styles.inner]: mode === "inner",
  })

  return (
    <header className={headerClasses}>
      <h1>
        <span id="dialog-title">{title}</span>
      </h1>

      {(leftButton || closeDialog) && (
        <section className={styles.left}>
          {leftButton ||
            (closeDialog ? <CloseButton closeDialog={closeDialog} /> : null)}
        </section>
      )}

      {rightButton && <section className={styles.right}>{rightButton}</section>}
    </header>
  )
}

const Header: React.FC<HeaderProps> & {
  CloseButton: typeof CloseButton
} = props => {
  if (props.mode !== "hidden") {
    return <BaseHeader {...props} />
  }

  return (
    <>
      {/* <div className="u-sm-up-hide">
        <Spacer size="xloose" />
      </div> */}

      <VisuallyHidden>
        <BaseHeader {...props} />
      </VisuallyHidden>
    </>
  )
}

Header.CloseButton = CloseButton

export default Header
