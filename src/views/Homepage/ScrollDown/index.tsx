import React from "react"

import { Container, IconScrollDown } from "~/components"

import * as styles from "./styles.module.css"

const ScrollDown = () => {
  return (
    <section>
      <Container>
        <div className={styles.scroll}>
          <IconScrollDown size="xxl" />
        </div>
      </Container>
    </section>
  )
}

export default ScrollDown
