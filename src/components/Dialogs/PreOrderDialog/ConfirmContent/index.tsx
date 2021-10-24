import { ethers } from "ethers"
import React from "react"

import { Dialog, IconSpinner } from "~/components"
import { useAccount, usePreOrder } from "~/hooks"
import { weiToEther, weiToGWei } from "~/utils"

import * as styles from "./styles.module.css"

type ConfirmContentProps = {
  gotoConnectWallet: () => void
  onConfirm: (txReceipt: ethers.providers.TransactionReceipt) => void
}

const ConfirmContent: React.FC<ConfirmContentProps> = ({
  gotoConnectWallet,
  onConfirm,
}) => {
  const { account, maskedAddress, balance } = useAccount()
  const {
    isConnectedToSigner,

    gasLimit,
    gasPrice,
    unitPrice,
    inPreOrder,
    quantity,

    preOrder,
    pending,
    error,

    getTotalCost,
    getPreOrderCost,
  } = usePreOrder({ onPreOrderConfirm: onConfirm })

  if (!account || !inPreOrder) {
    return (
      <>
        <Dialog.Content>
          <Dialog.ErrorMessage>
            <p>
              {!inPreOrder
                ? "預購還未開始，可先連接加密錢包"
                : "要參加預購，請先連接加密錢包"}
            </p>
          </Dialog.ErrorMessage>
        </Dialog.Content>

        <Dialog.CTAButton onClick={gotoConnectWallet}>
          連接加密錢包
        </Dialog.CTAButton>
      </>
    )
  }

  const preOrderCost = getPreOrderCost()
  const totalCost = getTotalCost()
  const isBalanceInsufficient = totalCost && balance && balance.lte(totalCost)

  return (
    <>
      <Dialog.Content spacing="sm">
        <section className={styles.content}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.highlight}>
                <td>錢包地址</td>
                <td>{maskedAddress}</td>
              </tr>
              <tr>
                <td>錢包餘額</td>
                <td>{balance ? weiToEther(balance) : "..."} ETH</td>
              </tr>
              <hr className={styles.divider} />
              <tr className={styles.highlight}>
                <td>
                  <span className={styles.highlight}>預購數量</span>
                </td>
                <td>
                  {unitPrice ? weiToEther(unitPrice) : "..."} ETH x {quantity}
                </td>
              </tr>
              <tr className={styles.highlight}>
                <td>金額小計</td>
                <td>{preOrderCost ? weiToEther(preOrderCost) : "..."} ETH</td>
              </tr>
              <hr className={styles.divider} />
              <tr>
                <td>Gas Limit</td>
                <td>{gasLimit ? gasLimit.toString() : "..."}</td>
              </tr>
              <tr>
                <td>Gas Price</td>
                <td>{gasPrice ? weiToGWei(gasPrice) : "..."} GWEI</td>
              </tr>
              <hr className={styles.divider} />
              <tr className={styles.highlight}>
                <td>總計金額（最高）</td>
                <td>{totalCost ? weiToEther(totalCost) : "..."} ETH</td>
              </tr>
            </tbody>
          </table>

          {isBalanceInsufficient && (
            <Dialog.ErrorMessage>
              <p>錢包餘額不足</p>
            </Dialog.ErrorMessage>
          )}
          {error && (
            <Dialog.ErrorMessage>
              <p>{error}</p>
            </Dialog.ErrorMessage>
          )}
        </section>
      </Dialog.Content>

      <Dialog.CTAButton
        onClick={preOrder}
        disabled={
          pending || !gasLimit || isBalanceInsufficient || !isConnectedToSigner
        }
      >
        {pending ? <IconSpinner /> : "確認預購"}
      </Dialog.CTAButton>
    </>
  )
}

export default ConfirmContent
