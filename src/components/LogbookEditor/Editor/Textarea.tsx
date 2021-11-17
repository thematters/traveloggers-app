import React, { useContext } from "react"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

import { IconSend, IconSpinner, Logbook, LogbookContext } from "~/components"
import { weiToEther } from "~/utils"

import * as styles from "./styles.module.css"

type TextareaProps = {
  logbook: Logbook
  onSubmit: () => void
}

const Textarea: React.FC<TextareaProps> = ({ logbook, onSubmit }) => {
  // const { account, balance, getAccountBalance } = useAccount()
  const { updateDraft, appendLog, logbooks } = useContext(LogbookContext)

  const [content, setContent] = useState("")
  const [debouncedContent] = useDebounce(content, 300)

  const draft = logbook.draft
  const gasCost = draft?.gasCost
  const error = draft?.error
  const disabled = logbook.isLocked || draft?.sending

  console.log({ draft, logbook, logbooks, logbook2: logbooks[logbook.tokenId] })

  const handleSubmit = () => {
    appendLog(logbook.tokenId, content)
  }

  useEffect(() => {
    if (logbook.draft?.sent) {
      onSubmit()
    }
  }, [])

  useEffect(() => {
    if (!debouncedContent) {
      return
    }
    updateDraft(logbook.tokenId, debouncedContent)
  }, [debouncedContent])

  return (
    <section className={styles.content}>
      <textarea
        placeholder="Leave a message..."
        onChange={e => setContent(e.target.value)}
        disabled={disabled}
      />

      <footer className={styles.footer}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : gasCost ? (
          <p className={styles.hint}>
            {content.length} characters,{" "}
            {parseFloat(weiToEther(gasCost)).toFixed(6)} ETH
          </p>
        ) : (
          <p></p>
        )}

        <button
          type="submit"
          className={styles.button}
          onClick={handleSubmit}
          disabled={disabled || !draft?.message}
        >
          {draft?.sending ? (
            <IconSpinner size="mdS" />
          ) : (
            <IconSend size="mdS" />
          )}
        </button>
      </footer>
    </section>
  )
}

export default Textarea
