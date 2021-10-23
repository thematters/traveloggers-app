import { Location } from "@reach/router"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"
import React, { useState } from "react"

import { IconArrowDown, IconWorld } from "~/components"

import * as styles from "./styles.module.css"

const LanguageSwitch = () => {
  const { locale, config } = useLocalization()
  const langPrefix = `/${locale}`
  const configMap = new Map(config.map(lang => [lang.code, lang]))

  return (
    <Location>
      {({ location }) => {
        let strippedPath = location.pathname
        // need to strip the lang prefix: from like `/en/about` to `/about`
        // why not provide a helper in gatsby-theme-i18n?
        if (strippedPath.startsWith(langPrefix))
          strippedPath = strippedPath.substring(langPrefix.length)
        if (strippedPath === "") strippedPath = "/"

        return (
          <section className={styles.switches}>
            <button>
              <IconWorld />
              <span>{configMap.get(locale).localName}</span>
              <IconArrowDown />
            </button>
            <ul>
              {config
                .filter(
                  lang => lang.code in { "zh-hant": 1, "zh-hans": 1, en: 1 }
                )
                .map(lang => (
                  <li key={lang.code}>
                    <LocalizedLink language={lang.code} to={strippedPath}>
                      {lang.localName}
                    </LocalizedLink>
                  </li>
                ))}
            </ul>
          </section>
        )
      }}
    </Location>
  )
}

export default LanguageSwitch
