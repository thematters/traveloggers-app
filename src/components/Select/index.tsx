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
  value: Value
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
        value={value}
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
            {value}
          </TextIcon>
        </ListboxButton>
        <ListboxPopover>
          <ListboxList>
            {options.map(option => (
              <ListboxOption key={option.value} value={option.value}>
                {option.name}
              </ListboxOption>
            ))}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </section>
  )
}
