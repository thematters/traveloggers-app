import classNames from "classnames"
import React from "react"

import { IconMinus, IconPlus } from "~/components"
import { useResponsive } from "~/hooks"

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
  const isMediumUp = useResponsive("md-up")

  const itemClasses = classNames({
    [styles.item]: true,
    [styles.itemMdUp]: isMediumUp,
  })

  const titleClasses = classNames({
    [styles.title]: true,
    [styles.titleMdUp]: isMediumUp,
  })

  const contentClasses = classNames({
    [styles.content]: true,
    [styles.contentMdUp]: isMediumUp,
  })

  return (
    <section className={styles.container} style={customStyles}>
      <section className={itemClasses} onClick={() => setOpened(!opened)}>
        <section className={titleClasses}>{title}</section>
        <section>{opened ? <IconMinus /> : <IconPlus />}</section>
      </section>
      {opened && <section className={contentClasses}>{content}</section>}
    </section>
  )
}
