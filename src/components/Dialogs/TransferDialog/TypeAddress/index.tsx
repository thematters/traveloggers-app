import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

import { Dialog, IconSpinner } from "~/components"
import { Lang } from "~/enums"
import { useTransfer } from "~/hooks"
import { toEtherscanUrl } from "~/utils"

import * as styles from "./styles.module.css"

type TypeAddressProps = {
  tokenId: string
  onConfirm: (txReceipt: ethers.providers.TransactionReceipt) => void
}

const TypeAddress: React.FC<TypeAddressProps> = ({ tokenId, onConfirm }) => {
  const { locale } = useLocalization()

  const [tx, setTx] = useState<ethers.providers.TransactionResponse | null>(
    null
  )
  const { url: txUrl } = tx ? toEtherscanUrl(tx.hash) : { url: "" }

  const {
    to: sendTo,
    transferring,
    error,
    setSendTo,
    transfer,
  } = useTransfer({
    onSend: (_tx: ethers.providers.TransactionResponse) => setTx(_tx),
    onConfirm,
  })

  const [address, setAddress] = useState("")
  const [debouncedContent] = useDebounce(address, 300)

  useEffect(() => {
    setSendTo(debouncedContent)
  }, [debouncedContent])

  return (
    <>
      <Dialog.Content>
        <label htmlFor="address" className={styles.label}>
          {locale === Lang.en
            ? "Enter Ethereum wallet address or ENS name"
            : "輸入以太坊錢包地址或者是 ENS 名稱"}
        </label>

        <input
          id="address"
          className={styles.input}
          type="text"
          placeholder="e.g. 0xFb3... or matters.eth"
          disabled={transferring}
          onChange={event => setAddress(event.target.value)}
        />

        {!error && !transferring && sendTo && (
          <Dialog.Message type="info">
            <p>
              {locale === Lang.en
                ? `"Travelogger #${tokenId}" will be transferred to ${sendTo}`
                : `"Travelogger #${tokenId}" 將發送到 ${sendTo}`}
            </p>
          </Dialog.Message>
        )}
        {error && (
          <Dialog.Message>
            <p>{error}</p>
          </Dialog.Message>
        )}
        {transferring && (
          <Dialog.Message type={tx ? "success" : "warning"}>
            {!tx && (
              <p>
                {locale === Lang.en
                  ? "Please confirm transaction in your wallet"
                  : "請到你的錢包確認交易"}
              </p>
            )}
            {tx && (
              <p>
                {locale === Lang.en
                  ? "Confirming transaction ("
                  : "交易確認中（"}
                <a
                  href={txUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  {locale === Lang.en
                    ? "View on Etherscan"
                    : "在 Ethertscan 上查看"}
                </a>
                {locale === Lang.en ? ")" : "）"}
              </p>
            )}
          </Dialog.Message>
        )}
      </Dialog.Content>

      <Dialog.CTAButton
        disabled={transferring || !!error}
        onClick={() => {
          transfer({ tokenId })
        }}
      >
        {transferring ? (
          <IconSpinner />
        ) : (
          <>{locale === Lang.en ? "Transfer" : "送出"}</>
        )}
      </Dialog.CTAButton>
    </>
  )
}

export default TypeAddress
