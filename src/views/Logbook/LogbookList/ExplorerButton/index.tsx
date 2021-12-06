import classNames from "classnames"
import React from "react"

import { IconLogbook, TextIcon } from "~/components"

import * as styles from "./styles.module.css"

interface Props {
  exploring: boolean
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any
}

const ExplorerButton: React.FC<Props> = ({ exploring, onClick }) => {
  return (
    <button
      className={classNames({
        [styles.explorer]: true,
        [styles.exploringOn]: exploring,
      })}
      onClick={onClick}
    >
      {exploring ? (
        <span>探索模式已開啟</span>
      ) : (
        <TextIcon icon={<IconLogbook />} spacing="loose">
          想在宇宙遨遊？切換探索模式！
        </TextIcon>
      )}
    </button>
  )
}

export default ExplorerButton
