import React from "react"

import { Button, ButtonProps } from "~/components"

import * as styles from "./styles.module.css"

/**
 * Call to Action Button
 */
type DialogCTAButtonProps = ButtonProps

const DialogCTAButton: React.FC<DialogCTAButtonProps> = ({
  children,
  ...buttonProps
}) => {
  return (
    <section className={styles.cta}>
      <Button
        color="primary"
        width="100%"
        height="3rem"
        spacingY=".75rem"
        {...buttonProps}
      >
        {children}
      </Button>
    </section>
  )
}

export default DialogCTAButton
