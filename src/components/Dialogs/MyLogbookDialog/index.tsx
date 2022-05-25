import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { Dialog } from "~/components"
import { Lang } from "~/enums"
import { useDialogSwitch } from "~/hooks"

import * as styles from "./styles.module.css"

type MyLogbookDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

export const MyLogbookDialog: React.FC<MyLogbookDialogProps> = ({
  children,
}) => {
  const { locale } = useLocalization()

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(false)

  const openDialog = () => {
    baseOpenDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <span>{locale === Lang.en ? "My Logbook" : "My Logbook"}</span>
          }
          closeDialog={closeDialog}
        />
        <Dialog.Content>
          <p>
            {locale === Lang.en
              ? "Logbook 2.0 has just launched. If you are owner of Traveloggers, let’s go claim one from the new "
              : "第二代航行日誌已經上線，如果你是 Treveloggers 擁有者，請前往新的  "}
            <a href="https://logbook.matters.news/" target="_blank" rel="noreferrer">
              {locale === Lang.en ? "Logbook page" : "Logbook 頁面"}
            </a>
            {locale === Lang.en ? "." : "領取。"}
          </p>
          <div className={styles.buttons}>
            <a
              className={styles.btn}
              href="https://logbook.matters.news/"
              target="_blank"
              rel="noreferrer"
            >
              <i className={`${styles.icon} ${styles.logbook2}`}></i>
              Logbook 2.0 Bookcase
            </a>
            <Link
              className={`${styles.btn}`}
              to="/logbooks"
              language={undefined}
            >
              <i className={`${styles.icon} ${styles.logbook1}`}></i>
              Logbook 1.0 Bookcase
            </Link>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  )
}
