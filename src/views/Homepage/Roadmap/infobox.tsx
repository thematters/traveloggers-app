import classNames from "classnames"
import React from "react"

import { Section } from "~/components"

import * as styles from "./infobox.module.css"

interface Stage {
  name: string
  content: React.ReactNode
}

interface InfoboxProps {
  active: boolean
  event: React.ReactNode
  content: React.ReactNode
  stage1?: Stage
  stage2?: Stage
  button: React.ReactNode
}

const Infobox = ({
  active,
  event,
  content,
  stage1,
  stage2,
  button,
}: InfoboxProps) => {
  const containerClasses = classNames({
    [styles.container]: true,
    [styles.active]: active,
  })

  return (
    <section className={containerClasses}>
      <section className={styles.info}>
        <section className={styles.title}>{event}</section>
        <section className={styles.content}>
          <Section.Content>{content}</Section.Content>
        </section>
      </section>

      <section className={styles.timeDetails}>
        <section className={styles.stages}>
          {stage1 && (
            <section className={styles.stage}>
              <p className={styles.event}>{stage1.name}</p>
              {stage1.content}
            </section>
          )}
          {stage2 && (
            <section className={styles.stage}>
              <p className={styles.event}>{stage2.name}</p>
              {stage2.content}
            </section>
          )}
        </section>
        <section className={styles.button}>{button}</section>
      </section>
    </section>
  )
}

export default Infobox
