import React from "react"

import { Dialog } from "~/components"
import { useDialogSwitch } from "~/hooks"

import Content from "./Content"

type PreOrderDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

export const PreOrderDialog: React.FC<PreOrderDialogProps> = ({ children }) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(false)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Content closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}
