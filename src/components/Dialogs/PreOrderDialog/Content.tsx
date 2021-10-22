import React from "react"

import { Dialog, SignInWithMatters } from "~/components"

export interface PreOrderDialogContentProps {
  closeDialog: () => void
}

const PreOrderDialogContent: React.FC<PreOrderDialogContentProps> = ({
  closeDialog,
}) => (
  <>
    <Dialog.Header title={<span>參加預購</span>} closeDialog={closeDialog} />

    <Dialog.Content>
      <p>
        任何擁有 Ethereum 錢包的朋友即可進行預購。有 Matters
        帳號的會員可以先登入綁定，取得 NFT
        後可以享有福利，也歡迎尚未註冊帳號的朋友成為馬特市一員。
      </p>

      <SignInWithMatters />
    </Dialog.Content>
  </>
)

export default PreOrderDialogContent
