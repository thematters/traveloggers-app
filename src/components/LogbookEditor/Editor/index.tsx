import classNames from "classnames"
import React from "react"

import { Logbook } from "~/components"

import Hint from "./Hint"
import * as styles from "./styles.module.css"
import Textarea from "./Textarea"

export enum EditorStep {
  hide = "hide",
  hint = "hint",
  write = "write",
}

type EditorProps = {
  logbook: Logbook
  step: EditorStep
  forwardEditor: (step: EditorStep) => void
  onSubmit: () => void
}

const Editor: React.FC<EditorProps> = ({
  logbook,
  step,
  forwardEditor,
  onSubmit,
}) => {
  return (
    <section
      className={classNames({
        [styles.layerEditor]: true,
        [styles[step]]: true,
      })}
    >
      <div className={styles.container}>
        {step === "hint" && (
          <Hint nextStep={() => forwardEditor(EditorStep.write)} />
        )}
        {step === "write" && <Textarea logbook={logbook} onSubmit={onSubmit} />}
      </div>
    </section>
  )
}

export default Editor
