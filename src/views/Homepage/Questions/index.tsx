import classNames from "classnames"
import React from "react"

import { Container, Expandable, Section } from "~/components"

import * as Items from "./items"
import * as styles from "./styles.module.css"

const Questions = () => {
  const containerClasses = classNames({
    [styles.questions]: true,
  })

  const expandableStyles = {
    customStyles: { paddingTop: "1rem" },
  }

  return (
    <section className={containerClasses}>
      <Container>
        <Section.Title>FAQ</Section.Title>

        <Expandable customStyles={{ paddingTop: "1.5rem" }} {...Items.Item1} />
        <Expandable {...expandableStyles} {...Items.Item2} />
        <Expandable {...expandableStyles} {...Items.Item4} />
        <Expandable {...expandableStyles} {...Items.Item5} />
        <Expandable {...expandableStyles} {...Items.Item6} />
        <Expandable {...expandableStyles} {...Items.Item7} />
        <Expandable {...expandableStyles} {...Items.Item8} />
        <Expandable {...expandableStyles} {...Items.Item9} />
      </Container>
    </section>
  )
}

export default Questions
