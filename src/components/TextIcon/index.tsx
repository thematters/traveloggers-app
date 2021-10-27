import classNames from "classnames"
import React from "react"

import * as styles from "./styles.module.css"

type TextIconColor =
  | "black"
  | "green"
  | "gold"
  | "grey"
  | "greyLight"
  | "greyDarker"
  | "greyDark"
  | "white"
  | "red"

export interface TextIconProps {
  icon?: React.ReactNode

  color?: TextIconColor
  size?: "xs" | "sm" | "smS" | "mdS" | "md" | "xm" | "lg"
  spacing?: 0 | "xxxTight" | "xxTight" | "xTight" | "tight" | "base" | "loose"
  weight?: "light" | "normal" | "medium" | "semibold" | "bold"

  textPlacement?: "bottom" | "left" | "right"
  underline?: boolean
}

/**
 * `<TextIcon>` component that combines text and `<Icon>` to render as left-right/top-bottom layout.
 *
 * Usage:
 *
 * ```jsx
 * <TextIcon
 *   icon={<Icon id={ICON_MAT_GOLD.id}
 *   viewBox={ICON_MAT_GOLD.viewBox}
 * >
 *  123
 * </TextIcon>} />
 * ```
 */

export const TextIcon: React.FC<TextIconProps> = ({
  icon,

  color,
  size,
  spacing,
  weight,

  textPlacement = "right",
  underline,

  children,
}) => {
  const textIconClasses = classNames({
    [styles.textIcon]: true,
    [styles.color]: !!color,
    [styles[color]]: !!color,
    [styles.placement]: true,
    [styles[textPlacement]]: true,
    [styles.underline]: !!underline,
    [styles.size]: !!size,
    [styles[size]]: !!size,
    [styles.spacing]: !!spacing,
    [styles[spacing]]: !!spacing,
    [styles.weight]: !!weight,
    [styles[weight]]: !!weight,
    [styles.hasIcon]: !!icon,
  })

  if (textPlacement === "left") {
    return (
      <span className={textIconClasses}>
        {children && <span className={styles.text}>{children}</span>}

        {icon}
      </span>
    )
  }

  return (
    <span className={textIconClasses}>
      {icon}

      {children && <span className={styles.text}>{children}</span>}
    </span>
  )
}
