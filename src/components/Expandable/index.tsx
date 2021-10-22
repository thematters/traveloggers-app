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
    [styles.item_md_up]: isMediumUp,
  })

  const titleClasses = classNames({
    [styles.title]: true,
    [styles.title_md_up]: isMediumUp,
  })

  const contentClasses = classNames({
    [styles.content]: true,
    [styles.content_md_up]: isMediumUp,
  })

  return (
    <section className={styles.container} style={customStyles}>
      <section className={itemClasses}>
        <section className={titleClasses}>{title}</section>
        <section className={styles.button} onClick={() => setOpened(!opened)}>
          {opened ? <IconMinus /> : <IconPlus />}
        </section>
      </section>
      {opened && <section className={contentClasses}>{content}</section>}
    </section>
  )
}
