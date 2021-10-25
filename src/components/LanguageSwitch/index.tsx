import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { IconArrowDown, IconWorld, TextIcon } from "~/components"

import * as styles from "./styles.module.css"

type LanguageSwitchProps = {
  color: "white" | "grey"
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ color }) => {
  const { locale, config } = useLocalization()
  const currentLangIndex = config.findIndex((lang: any) => lang.code === locale)

  if (currentLangIndex < 0) return <></>

  const currentLang = config[currentLangIndex]
  const others = [
    ...config.slice(currentLangIndex + 1),
    ...config.slice(0, currentLangIndex),
  ] // rotated

  return (
    <section className={styles.switches}>
      <button type="button">
        <TextIcon icon={<IconWorld />} spacing="xxTight" color={color}>
          <TextIcon
            icon={<IconArrowDown size="xxs" />}
            size="xs"
            weight="medium"
            spacing="xxTight"
            textPlacement="left"
          >
            {currentLang.localName}
          </TextIcon>
        </TextIcon>
      </button>

      <ul>
        {others.map(lang => (
          <li key={lang.code}>
            <LocalizedLink language={lang.code} to="/">
              {lang.localName}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
