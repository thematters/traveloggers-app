import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import {
  CardButton,
  IconChecked,
  IconIndicator,
  IconWallet,
  TextIcon,
} from "~/components"
import { Lang } from "~/enums"
import { chainName } from "~/utils"

import * as styles from "./styles.module.css"

export const ConnectedAccountButton: React.FC = () => {
  const { locale } = useLocalization()

  const { deactivate, account, error } =
    useWeb3React<ethers.providers.Web3Provider>()

  const address = account
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : ""

  return (
    <CardButton
      title={address}
      subtitle={
        <TextIcon
          icon={<IconIndicator color="green" size="xxs" />}
          spacing="xxTight"
        >
          {chainName}
        </TextIcon>
      }
      leftIcon={<IconWallet size="xlM" />}
      right={
        <div className={styles.change}>
          <div role="button" onClick={deactivate}>
            <TextIcon underline size="xs">
              {locale === Lang.en ? "Edit" : "變更"}
            </TextIcon>
          </div>
          <IconChecked size="mdS" />
        </div>
      }
      disabled={!!error}
    />
  )
}
