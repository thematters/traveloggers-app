import "./select.css"

import {
  ListboxButton,
  ListboxInput,
  ListboxList,
  ListboxOption,
  ListboxPopover,
} from "@reach/listbox"
import VisuallyHidden from "@reach/visually-hidden"
import React from "react"

import { IconArrowDown, TextIcon } from ".."

type Value = string

type Option = {
  value: Value
  name: string
}

type SelectProps = {
  value: Option
  options: Option[]
  label: string
  onChange: (value: Value) => void
  disabled?: boolean
}

export const Select: React.FC<SelectProps> = ({
  value,
  options,
  label,
  onChange,
  disabled,
}) => {
  const labelId = "label"

  return (
    <section>
      <VisuallyHidden id={labelId}>{label}</VisuallyHidden>
      <ListboxInput
        aria-labelledby={labelId}
        value={value.value}
        onChange={onChange}
        disabled={disabled}
      >
        <ListboxButton>
          <TextIcon
            icon={<IconArrowDown size="xs" color="greyDark" />}
            size="mdS"
            spacing="xTight"
            textPlacement="left"
          >
            {value.name}
          </TextIcon>
        </ListboxButton>
        <ListboxPopover portal={false}>
          <ListboxList>
            {options.map(option => (
              <ListboxOption key={option.value} value={option.value}>
                <TextIcon
                  icon={<IconArrowDown size="xs" color="greyDark" />}
                  // icon in popover just as placeholder
                  // to stretch the content width, will be hide by CSS
                  size="mdS"
                  spacing="xTight"
                  textPlacement="left"
                >
                  {option.name}
                </TextIcon>
              </ListboxOption>
            ))}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </section>
  )
}
