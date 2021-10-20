import React from "react"

import { IconArrowDown, IconWorld, TextIcon } from "~/components"

type LanguageSwitchProps = {
  color: "white" | "grey"
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ color }) => {
  return (
    <button type="button">
      <TextIcon icon={<IconWorld />} spacing="xxTight" color={color}>
        <TextIcon
          icon={<IconArrowDown size="xxs" />}
          size="xs"
          weight="medium"
          spacing="xxTight"
          textPlacement="left"
        >
          English
        </TextIcon>
      </TextIcon>
    </button>
  )
}
