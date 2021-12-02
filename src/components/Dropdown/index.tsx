import React from "react"

import { Z_INDEX } from "~/enums"

import LazyTippy from "./LazyTippy"

export type PopperInstance = any
export type PopperProps = import("@tippyjs/react").TippyProps

export const Dropdown: React.FC<PopperProps> = props => (
  <LazyTippy
    arrow={false}
    trigger="click"
    interactive
    offset={[0, 4]}
    placement="bottom"
    animation="shift-away"
    theme="dropdown"
    zIndex={Z_INDEX.DROP_DOWN}
    {...props}
  />
)

export const hidePopperOnClick = (instance: PopperInstance) => {
  const box = instance.popper.firstElementChild

  if (!box) {
    return
  }

  box.addEventListener("click", (event: any) => {
    const target = event.target as HTMLElement

    if (target?.closest && target.closest("[data-clickable], a, button")) {
      instance.hide()
    }
  })
}
