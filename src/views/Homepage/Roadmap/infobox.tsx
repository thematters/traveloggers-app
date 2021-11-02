import classNames from "classnames"
import React from "react"

import { Section } from "~/components"

import * as styles from "./infobox.module.css"

interface Stage {
  name: string
  startDate: string
  startTime: string
  endDate?: string
  endTime?: string
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
    infobox: true,
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
              <p className={styles.date}>{stage1.startDate}</p>
              <p className={styles.time}>{stage1.startTime}</p>
              {stage1.endDate && (
                <>
                  <p className={styles.dash}>|</p>
                  <p className={styles.date}>{stage1.endDate}</p>
                  <p className={styles.time}>{stage1.endTime}</p>
                </>
              )}
            </section>
          )}
          {stage2 && (
            <section className={styles.stage}>
              <p className={styles.event}>{stage2.name}</p>
              <p className={styles.date}>{stage2.startDate}</p>
              <p className={styles.time}>{stage2.startTime}</p>
              {stage2.endDate && (
                <>
                  <p className={styles.dash}>|</p>
                  <p className={styles.date}>{stage2.endDate}</p>
                  <p className={styles.time}>{stage2.endTime}</p>
                </>
              )}
            </section>
          )}
        </section>
        <section className={styles.button}>{button}</section>
      </section>
    </section>
  )
}

export default Infobox
