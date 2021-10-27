import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { IconWorld, TextIcon } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

type LanguageSwitchProps = {
  originalPath: string
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  originalPath,
}) => {
  const { locale, config } = useLocalization()
  const current = config.find((lang: { code: Lang }) => lang.code === locale)
  const target = config.find((lang: { code: Lang }) => lang.code !== locale)

  return (
    <LocalizedLink language={target.code} to={originalPath}>
      <section className={styles.switches}>
        <TextIcon
          icon={<IconWorld />}
          spacing="xxTight"
          weight="medium"
          size="xs"
        >
          {current.localName}
        </TextIcon>
      </section>
    </LocalizedLink>
  )
}
