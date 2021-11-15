import classNames from "classnames"
import React from "react"

import * as styles from "./item.module.css"

interface ItemProps {
  content: React.ReactNode
  month?: React.ReactNode
  fade?: "in" | "out"
  extraStyles?: React.CSSProperties

  isSubtitle?: boolean
  isYear?: boolean
}

const Item = ({
  content,
  month,
  fade,
  extraStyles,
  isSubtitle,
  isYear,
}: ItemProps) => {
  const lineClasses = classNames({
    [styles.line]: true,
    [styles[`fade${fade}`]]: true,
  })

  return (
    <section className={styles.item} style={extraStyles}>
      <section className={styles.month}>{month}</section>
      <section className={styles.deco}>
        <div className={isSubtitle ? styles.circle : lineClasses} />
      </section>
      <section
        className={
          isYear ? styles.year : isSubtitle ? styles.subtitle : styles.content
        }
      >
        {content}
      </section>
    </section>
  )
}

export default Item
