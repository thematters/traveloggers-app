import React from "react"

import Content from "./Content"
import CTAButton from "./CTAButton"
import BaseDialog from "./Dialog"
import Header from "./Header"
import Message from "./Message"

/**
 * This is a responsive component which will show
 * Modal for desktop and Drawer for mobile
 *
 * @see {@url https://reacttraining.com/reach-ui/dialog}
 *
 * Usage:
 *
 * ```tsx
 * <Dialog>
 *   <Dialog.Header title={title} closeDialog={closeDialog} />
 *
 *   <Dialog.Content isOpen={showDialog} onDismiss={closeDialog}>
 *      ...
 *   </Dialog.Content>
 *
 *   <Dialog.Footer>
 *     <Dialog.Footer.Button />
 *     <Dialog.Footer.Button />
 *   </Dialog.Footer>
 * </Dialog>
 * ```
 */
export type DialogOverlayProps = import("./Dialog").DialogOverlayProps
export type BaseDialogProps = import("./Dialog").DialogProps

type DialogProps = React.ComponentType<BaseDialogProps> & {
  Header: typeof Header
  Content: typeof Content
  Message: typeof Message
  CTAButton: typeof CTAButton
}

export const Dialog = BaseDialog as DialogProps

Dialog.Header = Header
Dialog.Content = Content
Dialog.Message = Message
Dialog.CTAButton = CTAButton
