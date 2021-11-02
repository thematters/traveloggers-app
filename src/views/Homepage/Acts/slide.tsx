import classNames from "classnames"
import React from "react"

import * as styles from "./styles.module.css"

type SlideProps = {
  step: number
  stepIndex: number
  imgSrc: string
}

const BaseSlide = ({ step, stepIndex, imgSrc }: SlideProps) => (
  <section
    className={classNames({
      [styles.slide]: true,
      [styles.past]: step > stepIndex,
      [styles.present]: step === stepIndex,
      [styles.future]: step < stepIndex,
    })}
    // style={{ backgroundImage: `url("${imgSrc}")` }}
  >
    <img src={imgSrc} />
  </section>
)

const Slide = React.memo(
  BaseSlide,
  (prev: SlideProps, next: SlideProps) => prev.step === next.step
)

export default Slide
