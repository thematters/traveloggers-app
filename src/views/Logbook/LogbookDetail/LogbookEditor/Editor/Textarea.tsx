import { useLocalization } from "gatsby-theme-i18n"
import React, { useContext } from "react"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

import { IconSend, IconSpinner, Logbook, LogbookContext } from "~/components"
import { Lang } from "~/enums"
import { toEtherscanUrl, weiToEther } from "~/utils"

import * as styles from "./styles.module.css"

type TextareaProps = {
  logbook: Logbook
  onSubmit: () => void
}

const Textarea: React.FC<TextareaProps> = ({ logbook, onSubmit }) => {
  const { locale } = useLocalization()
  const { updateDraft, appendLog } = useContext(LogbookContext)

  const [content, setContent] = useState("")
  const [debouncedContent] = useDebounce(content, 300)

  const draft = logbook.draft
  const gasCost = draft?.gasCost
  const error = draft?.error
  const disabled = logbook.isLocked || draft?.sending

  const handleSubmit = () => {
    appendLog(logbook.tokenId, content)
  }

  useEffect(() => {
    if (draft?.sent) {
      onSubmit()
    }
  }, [draft?.sent])

  useEffect(() => {
    if (!debouncedContent) {
      return
    }
    updateDraft(logbook.tokenId, debouncedContent)
  }, [debouncedContent])

  return (
    <section className={styles.content}>
      <textarea
        placeholder={
          locale === Lang.en ? "Leave a message..." : "寫下日誌內容…"
        }
        onChange={e => setContent(e.target.value)}
        disabled={disabled}
      />

      <footer className={styles.footer}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : draft?.txHash ? (
          <p className={styles.info}>
            {locale === Lang.en ? "Confirming transaction (" : "交易確認中（"}
            <a
              href={toEtherscanUrl(draft.txHash).url}
              target="_blank"
              rel="noreferrer"
            >
              {locale === Lang.en
                ? "View on Etherscan"
                : "在 Ethertscan 上查看"}
            </a>
            {locale === Lang.en ? ")" : "）"}
          </p>
        ) : gasCost ? (
          <p className={styles.hint}>
            {content.length}{" "}
            {locale === Lang.en ? "characters, about" : "個字，約"}{" "}
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
