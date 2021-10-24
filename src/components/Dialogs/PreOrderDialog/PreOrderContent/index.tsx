import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import React from "react"

import { Button, Dialog } from "~/components"
import { useEagerConnect, useInactiveListener } from "~/hooks"
import { getWalletErrorMessage } from "~/utils"

import ConnectedAccountButton from "./ConnectedAccountButton"
import ConnectWalletButton from "./ConnectWalletButton"
import * as styles from "./styles.module.css"

type PreOrderContentProps = {
  nextStep: () => void
}

const PreOrderContent: React.FC<PreOrderContentProps> = ({ nextStep }) => {
  const { account, error } = useWeb3React<ethers.providers.Web3Provider>()

  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager)

  return (
    <>
      <Dialog.Content>
        <p>
          任何擁有 Ethereum 錢包的朋友即可進行預購。有 Matters
          帳號的會員可以先登入綁定，取得 NFT
          後可以享有福利，也歡迎尚未註冊帳號的朋友成為馬特市一員。
        </p>

        <section className={styles.buttons}>
          {!account && <ConnectWalletButton onClick={nextStep} />}
          {account && <ConnectedAccountButton />}
        </section>

        {error && (
          <p className={styles.error}>{getWalletErrorMessage(error)}</p>
        )}
      </Dialog.Content>

      <section className={styles.cta}>
        <Button color="primary" width="100%" height="3rem" spacingY=".75rem">
          參加預購
        </Button>
      </section>
    </>
  )
}

export default PreOrderContent
