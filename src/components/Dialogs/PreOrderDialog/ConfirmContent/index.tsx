import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useEffect } from "react"

import { Dialog, IconInfo, IconSpinner, Spinner, TextIcon } from "~/components"
import { Lang } from "~/enums"
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
  const { locale } = useLocalization()
  const { library } = useWeb3React<ethers.providers.Web3Provider>()
  const { account, maskedAddress, balance } = useAccount()
  const {
    loading,
    error,
    qtySelected,
    // qtyOrdered,
    // qtyLimited,
    qtyAvailable,
    // inPreOrder,
    unitPrice,
    gasLimit,
    gasPrice,

    preOrder,
    canPreOrder,
  } = usePreOrder({ onPreOrderConfirm: onConfirm })

  useEffect(() => {
    canPreOrder(true)
  }, [!!library, account])

  if (loading && !unitPrice) {
    return <Spinner />
  }

  const getPreOrderCost = () => {
    if (!unitPrice || !qtySelected) {
      return
    }
    return unitPrice.mul(qtySelected)
  }
  const getGasCost = () => {
    if (!gasLimit || !gasPrice) {
      return
    }
    return gasLimit.mul(gasPrice)
  }
  const getTotalCost = () => {
    const gasCost = getGasCost()
    const preOrderCost = getPreOrderCost()

    if (!gasCost || !preOrderCost) {
      return
    }

    return preOrderCost.add(gasCost)
  }
  const preOrderCost = getPreOrderCost()
  const totalCost = getTotalCost()
  const isReadyOutOfSupply = qtyAvailable.lt(10)

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
                  <div className={styles.qty}>
                    <span className={styles.highlight}>預購數量</span>
                    <span className={styles.supply}>
                      <TextIcon
                        icon={isReadyOutOfSupply ? <IconInfo /> : null}
                        spacing="xTight"
                        size="smS"
                        color={isReadyOutOfSupply ? "gold" : "green"}
                      >
                        {locale === Lang.en
                          ? `${qtyAvailable.toString()} left`
                          : `剩餘 ${qtyAvailable.toString()} 個`}
                      </TextIcon>
                    </span>
                  </div>
                </td>
                <td>
                  {unitPrice ? weiToEther(unitPrice) : "..."} ETH x{" "}
                  {qtySelected.toString()}
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

          {error && (
            <Dialog.ErrorMessage>
              <p>{error}</p>
            </Dialog.ErrorMessage>
          )}
        </section>
      </Dialog.Content>

      <Dialog.CTAButton onClick={preOrder} disabled={loading || !!error}>
        {loading ? <IconSpinner /> : "確認預購"}
      </Dialog.CTAButton>
    </>
  )
}

export default ConfirmContent
