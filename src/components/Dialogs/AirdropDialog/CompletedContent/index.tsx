import React from "react"

import { Dialog } from "~/components"

import * as styles from "./styles.module.css"

type CompletedContentProps = {
  closeDialog: () => void
}

const CompletedContent: React.FC<CompletedContentProps> = ({ closeDialog }) => {
  return (
    <>
      <Dialog.Content>
        <p className={styles.content}>
          空投將在&nbsp;<span className={styles.highlight}>11/10</span>
          &nbsp;進行
        </p>
      </Dialog.Content>

      <Dialog.CTAButton color="black" onClick={closeDialog}>
        完成
      </Dialog.CTAButton>
    </>
  )
}

export default CompletedContent
