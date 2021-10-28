import classNames from "classnames"
import React from "react"

import * as styles from "./styles.module.css"

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl"

export interface AvatarProps {
  size?: AvatarSize
  src?: string
}

export const Avatar = ({ size, src }: AvatarProps) => {
  const avatarClasses = classNames({
    [styles.avatar]: true,
    ...(size ? { [styles[size]]: true } : {}),
  })

  return (
    <div className={avatarClasses}>
      <img src={src || "/images/avatar-default.svg"} />
    </div>
  )
}
