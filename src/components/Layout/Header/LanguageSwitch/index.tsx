import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { IconArrowDown, IconWorld } from "~/components"

import * as styles from "./styles.module.css"

const LanguageSwitch = ({ originalPath }) => {
  const { locale, config } = useLocalization()
  const currentLangIndex = config.findIndex(lang => lang.code === locale)
  if (currentLangIndex < 0) return <></>

  const currentLang = config[currentLangIndex]
  const others = [
    ...config.slice(currentLangIndex + 1),
    ...config.slice(0, currentLangIndex),
  ] // rotated

  return (
    <section className={styles.switches}>
      <button>
        <IconWorld />
        <span>{currentLang.localName}</span>
        <IconArrowDown />
      </button>
      <ul>
        {others.map(lang => (
          <li key={lang.code}>
            <LocalizedLink language={lang.code} to={originalPath}>
              {lang.localName}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LanguageSwitch
