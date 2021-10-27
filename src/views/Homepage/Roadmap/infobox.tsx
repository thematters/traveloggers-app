import classNames from "classnames"
import React from "react"

import * as styles from "./infobox.module.css"

interface InfoboxProps {
  active: boolean
  title: React.ReactNode
  content: React.ReactNode
  time: React.ReactNode
  button: React.ReactNode
}

const Infobox = ({ active, title, content, time, button }: InfoboxProps) => {
  const containerClasses = classNames({
    infobox: true,
    [styles.container]: true,
    [styles.active]: active,
  })

  return (
    <section className={containerClasses}>
      <section className={styles.info}>
        <section className={styles.title}>{title}</section>
        <section className={styles.content}>{content}</section>
      </section>

      <section className={styles.timeDetails}>
        <p className={styles.timezone}>香港/台灣時區</p>
        <section className={styles.time}>{time}</section>
        <section className={styles.button}>{button}</section>
      </section>
    </section>
  )
}

export default Infobox
