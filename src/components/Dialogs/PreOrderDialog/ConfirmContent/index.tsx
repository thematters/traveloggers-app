import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useEffect, useState } from "react"

import {
  Dialog,
  IconInfo,
  IconSpinner,
  Select,
  Spinner,
  TextIcon,
} from "~/components"
import { Lang } from "~/enums"
import { useAccount, usePreOrder } from "~/hooks"
import { maskAddress, toEtherscanUrl, weiToEther, weiToGWei } from "~/utils"

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

  const [tx, setTx] = useState<ethers.providers.TransactionResponse | null>(
    null
  )
  const { url: txUrl } = tx ? toEtherscanUrl(tx.hash) : { url: "" }

  const {
    contract,

    loading,
    sending,
    error,
    qtySelected,
    qtyOrdered,
    qtyLimited,
    qtyAvailable,
    // inPreOrder,
    unitPrice,
    gasLimit,
    gasPrice,

    setQtySelected,
    preOrder,
    canPreOrder,
  } = usePreOrder({
    onPreOrderSend: (_tx: ethers.providers.TransactionResponse) => setTx(_tx),
    onPreOrderConfirm: onConfirm,
  })

  // refresh on account or qty changes
  useEffect(() => {
    canPreOrder(true)
  }, [!!library, account, qtySelected])

  // refresh every 10 secs
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     canPreOrder(true)
  //   }, 10000)

  //   return () => clearInterval(timer)
  // }, [])

  if (loading && !unitPrice) {
    return <Spinner />
  }

  // costs
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

  // qty
  const isReadyOutOfSupply = qtyAvailable.lt(10)
  const qtyOptions = [...Array(qtyLimited.sub(qtyOrdered).toNumber())].map(
    (_, index) => ({
      value: index + 1 + "",
      name: index + 1 + "",
    })
  )
  const onQtySelectChange = (value: string) => {
    setQtySelected(ethers.BigNumber.from(value))
  }

  return (
    <>
      <Dialog.Content spacing="sm">
        <section>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.highlight}>
                <td>{locale === Lang.en ? "Contract Address" : "????????????"}</td>
                <td>
                  {/* use checksum address */}
                  {maskAddress(ethers.utils.getAddress(contract.address))}
                </td>
              </tr>
              <tr className={styles.highlight}>
                <td>{locale === Lang.en ? "Wallet Address" : "????????????"}</td>
                <td>{maskedAddress}</td>
              </tr>
              <tr>
                <td>{locale === Lang.en ? "Wallet Balance" : "????????????"}</td>
                <td>{balance ? weiToEther(balance) : "..."} ETH</td>
              </tr>
              <hr className={styles.divider} />
              <tr className={styles.highlight}>
                <td>
                  <div className={styles.qty}>
                    <span className={styles.highlight}>
                      {locale === Lang.en ? "Amount" : "????????????"}
                    </span>
                    <span className={styles.supply}>
                      <TextIcon
                        icon={isReadyOutOfSupply ? <IconInfo /> : null}
                        spacing="xTight"
                        size="smS"
                        color={isReadyOutOfSupply ? "gold" : "green"}
                      >
                        {locale === Lang.en
                          ? `${qtyAvailable.toString()} left`
                          : `?????? ${qtyAvailable.toString()} ???`}
                      </TextIcon>
                    </span>
                  </div>
                </td>
                <td>
                  <div className={styles.selector}>
                    {unitPrice ? weiToEther(unitPrice) : "..."} ETH&nbsp;x&nbsp;
                    <Select
                      options={qtyOptions}
                      value={{
                        name: qtySelected.toString(),
                        value: qtySelected.toString(),
                      }}
                      onChange={onQtySelectChange}
                      label={
                        locale === Lang.en
                          ? "Select pre-order amount"
                          : "??????????????????"
                      }
                      disabled={loading}
                    />
                  </div>
                </td>
              </tr>
              <tr className={styles.highlight}>
                <td>{locale === Lang.en ? "Subtotal" : "????????????"}</td>
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
                <td>{locale === Lang.en ? "Total" : "????????????????????????"}</td>
                <td>{totalCost ? weiToEther(totalCost) : "..."} ETH</td>
              </tr>
            </tbody>
          </table>

          {error && (
            <Dialog.Message>
              <p>{error}</p>
            </Dialog.Message>
          )}
          {sending && (
            <Dialog.Message type={tx ? "success" : "warning"}>
              {!tx && (
                <p>
                  {locale === Lang.en
                    ? "Please confirm transaction in your wallet"
                    : "??????????????????????????????"}
                </p>
              )}
              {tx && (
                <p>
                  {locale === Lang.en
                    ? "Confirming transaction ("
                    : "??????????????????"}
                  <a
                    href={txUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                  >
                    {locale === Lang.en
                      ? "View on Etherscan"
                      : "??? Ethertscan ?????????"}
                  </a>
                  {locale === Lang.en ? ")" : "???"}
                </p>
              )}
            </Dialog.Message>
          )}
        </section>
      </Dialog.Content>

      <Dialog.CTAButton onClick={preOrder} disabled={loading}>
        {loading ? (
          <IconSpinner />
        ) : (
          <>{locale === Lang.en ? "Confirm" : "????????????"}</>
        )}
      </Dialog.CTAButton>
    </>
  )
}

export default ConfirmContent
