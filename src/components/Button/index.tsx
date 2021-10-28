import classNames from "classnames"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import React, { forwardRef, RefObject, useRef } from "react"

import * as styles from "./styles.module.css"

export type ButtonSize = string

export type ButtonSpacing = string

type ButtonColor = "primary" | "black" | "blackLight"

export type ButtonProps = {
  color?: ButtonColor

  width?: ButtonSize
  height?: ButtonSize
  spacingX?: ButtonSpacing
  spacingY?: ButtonSpacing

  to?: string

  ref?: RefObject<any> | ((instance: any) => void) | null | undefined

  // navtive props
  htmlHref?: string
  htmlTarget?: "_blank"
  type?: "button" | "submit"
  disabled?: boolean
  form?: string
  rel?: string
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any
  onMouseEnter?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any
  onMouseLeave?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any
}

export const Button: React.FC<ButtonProps> = forwardRef(
  (
    {
      color = "primary",

      width,
      height,
      spacingX = 0,
      spacingY = 0,

      to,

      htmlHref,
      htmlTarget,
      type = "button",

      children,
      ...restProps
    },
    ref
  ) => {
    const fallbackRef = useRef(null)
    const buttonRef = (ref || fallbackRef) as React.RefObject<any> | null

    const buttonClasses = classNames({
      [styles.button]: true,
      [styles[color]]: true,
    })

    const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (restProps.onClick) {
        restProps.onClick(event)
      }

      // blur on click
      if (buttonRef?.current) {
        buttonRef.current.blur()
      }
    }

    const buttonProps = {
      ...restProps,
      onClick,
      ref: buttonRef as React.RefObject<any>,
      className: buttonClasses,
      style: {
        width,
        height,
        padding: `${spacingY} ${spacingX}`,
      },
    }

    // external link
    if (htmlHref) {
      return (
        <a href={htmlHref} target={htmlTarget} {...buttonProps}>
          {children}
        </a>
      )
    }

    // internal link
    if (to) {
      return (
        <Link to={to} language={undefined}>
          <a {...buttonProps}>{children}</a>
        </Link>
      )
    }

    // button
    return (
      <button {...buttonProps} type={type}>
        {children}
      </button>
    )
  }
)
