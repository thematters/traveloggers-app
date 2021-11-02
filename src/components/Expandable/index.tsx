import React from "react"

import { IconMinus, IconPlus } from "~/components"
import { analytics } from "~/utils"

import * as styles from "./styles.module.css"

interface ExpandableProps {
  customStyles?: React.CSSProperties
  title?: React.ReactNode
  content?: React.ReactNode
}

export const Expandable = ({
  customStyles,
  title,
  content,
}: ExpandableProps) => {
  const [opened, setOpened] = React.useState<boolean>(false)

  return (
    <section className={styles.container} style={customStyles}>
      <section
        className={styles.item}
        onClick={() => {
          if (!opened) {
            analytics("click_button", { type: "expand_faq" })
          }
          setOpened(!opened)
        }}
      >
        <section className={styles.title}>{title}</section>
        <section>{opened ? <IconMinus /> : <IconPlus />}</section>
      </section>
      {opened && <section className={styles.content}>{content}</section>}
    </section>
  )
}
