import classNames from "classnames"
import React from "react"

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
    [styles.container]: true,
    [styles.active]: active,
  })

  const stage2Classes = classNames({
    [styles.stage]: true,
    [styles.stageSpacing]: true,
  })

  return (
    <section className={containerClasses}>
      <section className={styles.info}>
        <section className={styles.title}>{event}</section>
        <section className={styles.content}>{content}</section>
      </section>

      <section className={styles.timeDetails}>
        <section className={styles.stages}>
          {stage1 && (
            <section className={styles.stage}>
              <p className={styles.event}>{stage1.name}</p>
              <section className={styles.stageTime}>
                <p>
                  <span className={styles.date}>{stage1.startDate}</span>
                  <span className={styles.time}>
                    {" "}
                    UTC+8:00 {stage1.startTime}
                  </span>
                  {stage1.endDate && <span className={styles.dash}>-</span>}
                </p>
                {stage1.endDate && (
                  <p>
                    <span className={styles.date}>{stage1.endDate}</span>
                    <span className={styles.time}>
                      {" "}
                      UTC+8:00 {stage1.endTime}
                    </span>
                  </p>
                )}
              </section>
            </section>
          )}
          {stage2 && (
            <section className={stage2Classes}>
              <p className={styles.event}>{stage2.name}</p>
              <section className={styles.stageTime}>
                <p>
                  <span className={styles.date}>{stage2.startDate}</span>
                  <span className={styles.time}>
                    {" "}
                    UTC+8:00 {stage2.startTime}
                  </span>
                  <span className={styles.dash}>-</span>
                </p>
                {stage2.endDate && (
                  <p>
                    <span className={styles.date}>{stage2.endDate}</span>
                    <span className={styles.time}>
                      {" "}
                      UTC+8:00 {stage2.endTime}
                    </span>
                  </p>
                )}
              </section>
            </section>
          )}
        </section>
        <section className={styles.button}>{button}</section>
      </section>
    </section>
  )
}

export default Infobox
