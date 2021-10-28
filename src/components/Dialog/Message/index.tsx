import Alert from "@reach/alert"
import classNames from "classnames"
import React from "react"

import { IconInfo } from "~/components"

import * as styles from "./styles.module.css"

type DialogMessageProps = {
  type?: "info" | "success" | "warning" | "error"
}

const DialogMessage: React.FC<DialogMessageProps> = ({
  type = "error",
  children,
}) => {
  const msgClasses = classNames({
    [styles.msg]: true,
    ...(type ? { [styles[type]]: true } : {}),
  })

  return (
    <section className={msgClasses}>
      <span className={styles.icon}>
        <IconInfo
          color={
            type === "info"
              ? "greyDark"
              : type === "success"
              ? "green"
              : type === "warning"
              ? "gold"
              : "red"
          }
        />
      </span>

      <Alert>{children}</Alert>
    </section>
  )
}

export default DialogMessage
