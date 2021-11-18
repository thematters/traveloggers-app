import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import env from "@/.env.json"
import { Dialog, Logbook } from "~/components"
import { Lang } from "~/enums"
import { useDialogSwitch } from "~/hooks"

import * as styles from "./styles.module.css"

type VisitorDialogProps = {
  logbook: Logbook
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const VisitorDialog: React.FC<VisitorDialogProps> = ({ logbook, children }) => {
  const { locale } = useLocalization()

  const { show, openDialog, closeDialog } = useDialogSwitch(false)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <span>{locale === Lang.en ? "Join writing" : "Join writing"}</span>
          }
          closeDialog={closeDialog}
        />

        <Dialog.Content>
          <div className={styles.content}>
            <p>
              {locale === Lang.en
                ? "The owner of the Avatar can unlock all the text in the Logbook. This avatar now is not available to be traded. Explore other avatars on OpenSea!"
                : "The owner of the Avatar can unlock all the text in the Logbook. This avatar now is not available to be traded. Explore other avatars on OpenSea!"}
            </p>
            <img src="/images/logbook/buy-to-write.png" />
          </div>
        </Dialog.Content>

        <section className={styles.buttons}>
          <Dialog.CTAButton
            color="primary"
            htmlHref={logbook.tokenOpenSeaURL}
            htmlTarget="_blank"
          >
            {locale === Lang.en
              ? "Check out this Avatar"
              : "Check out this Avatar"}
          </Dialog.CTAButton>
          <Dialog.CTAButton
            color="blackLight"
            htmlHref={env.socialUrls.en.opensea}
            htmlTarget="_blank"
          >
            {locale === Lang.en
              ? "View all Traveloggers"
              : "View all Traveloggers"}
          </Dialog.CTAButton>
        </section>
      </Dialog>
    </>
  )
}

export default VisitorDialog
