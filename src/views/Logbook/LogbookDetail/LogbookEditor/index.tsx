import classNames from "classnames"
import React, { useEffect } from "react"

import { Logbook } from "~/components"
import { useAccount, useResponsive, useStep } from "~/hooks"
import { preloadImages, sleep } from "~/utils"

import Editor, { EditorStep } from "./Editor"
import GifPlayer from "./GifPlayer"
import * as styles from "./styles.module.css"
import VisitorDialog from "./VisitorDialog"

type LogbookEditorProps = {
  logbook: Logbook
}

enum BookStep {
  openable = "openable",
  opening = "opening",
  // reversing = "reversing",
  closing = "closing",
}
enum PenStep {
  show = "show",
  hide = "hide",
}
enum PaperStep {
  hide = "hide",
  drenching = "drenching",
  folding = "folding",
}

const defaultStep = {
  book: BookStep.openable,
  editor: EditorStep.hide,
  pen: PenStep.hide,
  paper: PaperStep.hide,
}

const ClickToWrite = ({ onClick }: { onClick: () => void }) => {
  return (
    <div aria-role="button" aria-label="Open the logbook" onClick={onClick}>
      <p className={styles.hint}>Click key to Write</p>
      <img src="/images/logbook/book-openable.gif" />
    </div>
  )
}

const LogbookEditor: React.FC<LogbookEditorProps> = ({ logbook }) => {
  const isMediumUp = useResponsive("md-up")
  const { account } = useAccount()

  const { currStep: stepBook, forward: forwardBook } = useStep<BookStep>(
    defaultStep.book
  )
  const { currStep: stepEditor, forward: forwardEditor } = useStep<EditorStep>(
    defaultStep.editor
  )
  const { currStep: stepPen, forward: forwardPen } = useStep<PenStep>(
    defaultStep.pen
  )
  const { currStep: stepPaper, forward: forwardPaper } = useStep<PaperStep>(
    defaultStep.paper
  )

  useEffect(() => {
    preloadImages([
      "/images/logbook/book-openable.gif",
      "/images/logbook/book-opening.gif",
      "/images/logbook/book-closing.gif",
      "/images/logbook/pen.gif",
      "/images/logbook/close.gif",
      "/images/logbook/paper-drenching.gif",
      "/images/logbook/paper-folding.gif",
      "/images/logbook/paper-drenching-desktop.gif",
      "/images/logbook/paper-folding-desktop.gif",
    ])
  }, [])

  if (!logbook.tokenOwner) {
    return null
  }

  const isLocked = !logbook.draft?.sent && logbook.isLocked
  const isVisitor = logbook.tokenOwner !== account

  return (
    <section className={styles.container}>
      {/* Layer: Book */}
      {isVisitor ? (
        <section className={styles.container}>
          <section
            className={classNames({
              [styles.layerBook]: true,
              [styles[stepBook]]: true,
            })}
          >
            <VisitorDialog>
              {({ openDialog }) => <ClickToWrite onClick={openDialog} />}
            </VisitorDialog>
          </section>
        </section>
      ) : isLocked ? (
        <section className={styles.container}>
          <section className={styles.layerBook}>
            <img src="/images/logbook/book-locked.png" />
          </section>
        </section>
      ) : (
        <section
          className={classNames({
            [styles.layerBook]: true,
            [styles[stepBook]]: true,
          })}
        >
          {stepBook === BookStep.openable && (
            <ClickToWrite onClick={() => forwardBook(BookStep.opening)} />
          )}
          {stepBook === BookStep.opening && (
            <GifPlayer
              src="/images/logbook/book-opening.gif"
              duration={2200}
              onEnd={() => {
                forwardEditor(EditorStep.hint)
                forwardPen(PenStep.show)
              }}
            />
          )}
          {/* {stepBook === BookStep.reversing && (
          <GifPlayer src="/images/logbook/book-closing.gif" />
        )} */}
          {stepBook === BookStep.closing && (
            <GifPlayer src="/images/logbook/book-closing.gif" />
          )}
        </section>
      )}

      {/* Layer: Editor */}
      <Editor
        step={stepEditor}
        forwardEditor={forwardEditor}
        onSubmit={() => forwardPaper(PaperStep.drenching)}
        logbook={logbook}
      />

      {/* Layer: Paper */}
      <section
        className={classNames({
          [styles.layerPaper]: true,
          [styles[stepPaper]]: true,
        })}
      >
        {stepPaper === PaperStep.drenching && (
          <GifPlayer
            src={
              isMediumUp
                ? "/images/logbook/paper-drenching-desktop.gif"
                : "/images/logbook/paper-drenching.gif"
            }
            duration={1800}
            onEnd={async () => {
              forwardPaper(PaperStep.folding)
              forwardEditor(EditorStep.hide)
              forwardPen(PenStep.hide)
            }}
          />
        )}
        {stepPaper === PaperStep.folding && (
          <GifPlayer
            src={
              isMediumUp
                ? "/images/logbook/paper-folding-desktop.gif"
                : "/images/logbook/paper-folding.gif"
            }
            duration={3800}
            onEnd={() => {
              forwardPaper(PaperStep.hide)
              forwardBook(BookStep.closing)
            }}
          />
        )}
      </section>

      {/* Layer: Pen */}
      <section
        className={classNames({
          [styles.layerPen]: true,
          [styles[stepPen]]: true,
        })}
      >
        <button
          className={styles.close}
          onClick={async () => {
            forwardEditor(EditorStep.hide)
            forwardPen(PenStep.hide)
            await sleep(200)
            // forwardBook(BookStep.reversing)
            forwardBook(BookStep.closing)
            // await sleep(2200)
            // forwardBook(BookStep.openable)
          }}
        >
          <img src="/images/logbook/close.png" />
        </button>
        <img className={styles.pen} src="/images/logbook/pen.gif" />
      </section>
    </section>
  )
}

export default LogbookEditor
