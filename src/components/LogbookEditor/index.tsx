import React, { useContext, useEffect } from "react"

import { useAccount, useStep } from "~/hooks"

import { LogbookContext, Spinner } from ".."
import Editor from "./Editor"
import Hint from "./Hint"
import * as styles from "./styles.module.css"

type LogbookEditorProps = {
  tokenId: string
}

type Step = "hint" | "write"

export const LogbookEditor: React.FC<LogbookEditorProps> = ({ tokenId }) => {
  const { account } = useAccount()
  const { logbooks, getLogbook } = useContext(LogbookContext)

  const defaultStep = "hint"
  const { currStep, forward } = useStep<Step>(defaultStep)

  const logbook = logbooks[tokenId]
  useEffect(() => {
    if (logbook) {
      return
    }
    getLogbook(tokenId)
  }, [logbook])

  // TODO: move checkers to detail page
  if (!account) {
    return <h2>Please sign in first</h2>
  }

  if (!logbook) {
    return <h2>Logbook does not exist</h2>
  }

  if (logbook?.loading) {
    return <Spinner />
  }

  if (logbook.isLocked) {
    return <h2>Logbook is locked</h2>
  }

  return (
    <section className={styles.container}>
      {currStep === "hint" && <Hint nextStep={() => forward("write")} />}
      {currStep === "write" && <Editor logbook={logbook} />}
    </section>
  )
}
