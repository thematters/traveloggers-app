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
            <span>
              {locale === Lang.en ? "Join writing" : "Start writing now"}
            </span>
          }
          closeDialog={closeDialog}
        />

        <Dialog.Content>
          <div className={styles.content}>
            <p>
              {locale === Lang.en
                ? "The owner of Traveloggers also owns the Logbook, which has the collective memory of all previous Logbook owners. Now, you can choose to collect or sell it."
                : "Traveloggers 的擁有者，也擁有日誌本。日誌本裡，有歷任主人共同留下的箴言。現在，你可以選擇繼續收藏它，或者賣掉它。"}
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
            {locale === Lang.en ? "去 OpenSea 看看" : "View on OpenSea"}
          </Dialog.CTAButton>
        </section>
      </Dialog>
    </>
  )
}

export default VisitorDialog
