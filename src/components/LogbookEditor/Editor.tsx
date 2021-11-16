import React, { useContext } from "react"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

import { IconSend, IconSpinner, Logbook, LogbookContext } from "~/components"
import { weiToEther } from "~/utils"

import * as styles from "./styles.module.css"

type EditorProps = {
  logbook: Logbook
}

const Editor: React.FC<EditorProps> = ({ logbook }) => {
  // const { account, balance, getAccountBalance } = useAccount()
  const { updateDraft, appendLog } = useContext(LogbookContext)

  const [content, setContent] = useState("")
  const [debouncedContent] = useDebounce(content, 300)

  const draft = logbook.draft
  const gasCost = draft?.gasCost
  const error = draft?.error
  const disabled = logbook.isLocked || draft?.sending

  const onSubmit = () => {
    appendLog(logbook.tokenId, content)
  }

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
            {content.length} characters, {weiToEther(gasCost)} ETH
          </p>
        ) : (
          <p></p>
        )}

        <button
          type="button"
          className={styles.button}
          onClick={onSubmit}
          disabled={disabled}
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

export default Editor
