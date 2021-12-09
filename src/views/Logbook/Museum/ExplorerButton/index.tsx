import classNames from "classnames"
import { useLocalization } from "gatsby-theme-i18n"
import React from "react"

import { TextIcon } from "~/components"
import { Lang } from "~/enums"

import * as styles from "./styles.module.css"

interface Props {
  exploring: boolean
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any
}

const ExplorerButton: React.FC<Props> = ({ exploring, onClick }) => {
  const { locale } = useLocalization()

  return (
    <button
      className={classNames({
        [styles.explorer]: true,
        [styles.exploringOn]: exploring,
      })}
      onClick={onClick}
    >
      <TextIcon icon={<span className={styles.indicator} />} spacing="base">
        {exploring ? (
          <span>
            {locale === Lang.zh ? "探索模式已開啟" : "Explore Mode is on"}
          </span>
        ) : (
          <span>
            {locale === Lang.zh
              ? "想在宇宙遨遊？切換探索模式！"
              : "Turn on Explore Mode"}
          </span>
        )}
      </TextIcon>
    </button>
  )
}

export default ExplorerButton
