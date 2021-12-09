import classNames from "classnames"
import { useLocalization } from "gatsby-theme-i18n"
import range from "lodash/range"
import React, { forwardRef, RefObject, useRef, useState } from "react"

import { DropdownDialog, IconArrowDown } from "~/components"

import * as styles from "./selector.module.css"
import TEXTS from "./texts"

type Option = "value" | "perspective" | "thinking" | "personality"

interface OptionsProps {
  click: (value: Option) => void
  inDropdown?: boolean
}

const Options: React.FC<OptionsProps> = ({ click, inDropdown }) => {
  const { locale } = useLocalization()
  const texts = TEXTS[locale]

  const optionsClasses = classNames({
    [styles.options]: true,
    [styles.dropdown]: inDropdown,
  })

  return (
    <section className={optionsClasses}>
      <a onClick={() => click("value")}>{texts.value}</a>
      <a onClick={() => click("perspective")}>{texts.perspective}</a>
      <a onClick={() => click("thinking")}>{texts.thinking}</a>
      <a onClick={() => click("personality")}>{texts.personality}</a>
    </section>
  )
}

interface SelectorButtonProps {
  text: string
  ref: RefObject<any> | ((instance: any) => void) | null | undefined
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any
}

const SelectorButton: React.FC<SelectorButtonProps> = forwardRef(
  ({ text, ...restProps }, ref) => {
    const fallbackRef = useRef(null)
    const buttonRef = (ref || fallbackRef) as React.RefObject<any> | null

    const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (restProps.onClick) {
        restProps.onClick(event)
      }

      // blur on click
      if (buttonRef?.current) {
        buttonRef.current.blur()
      }
    }

    const buttonProps = {
      ...restProps,
      onClick,
      ref: buttonRef as React.RefObject<any>,
      className: styles.selector,
    }

    const Content = () => (
      <section className={styles.content}>
        <section className={styles.left}>
          <section className={styles.title}>
            <h5>{text}</h5>
          </section>
        </section>

        <section className={styles.right}>
          <IconArrowDown />
        </section>
      </section>
    )

    return (
      <button {...buttonProps} type="button">
        <Content />
      </button>
    )
  }
)

const Character = ({ src, name }: { src: string; name: string }) => {
  return (
    <section className={styles.avatar}>
      <div>
        <img src={src} />
        <p>{name}</p>
      </div>
    </section>
  )
}

const Selector = () => {
  const [value, setValue] = useState<Option>("value")
  const { locale } = useLocalization()
  const texts = TEXTS[locale]

  return (
    <>
      <DropdownDialog
        dropdown={{
          content: <Options click={setValue} inDropdown />,
          placement: "bottom-start",
        }}
        dialog={{
          content: <Options click={setValue} />,
          title: "",
        }}
      >
        {({ openDialog, ref }) => (
          <SelectorButton ref={ref} text={texts[value]} onClick={openDialog} />
        )}
      </DropdownDialog>

      <section className={styles.category}>
        {value === "value" && (
          <>
            {range(1, 13).map(item => (
              <Character
                key={item}
                src={`/images/characters/char1-${item}.png`}
                name={texts[`char1_${item}_desc`]}
              />
            ))}
          </>
        )}
        {value === "perspective" && (
          <>
            {range(1, 12).map(item => (
              <Character
                key={item}
                src={`/images/characters/char2-${item}.png`}
                name={texts[`char2_${item}_desc`]}
              />
            ))}
          </>
        )}
        {value === "thinking" && (
          <>
            {range(1, 12).map(item => (
              <Character
                key={item}
                src={`/images/characters/char3-${item}.png`}
                name={texts[`char3_${item}_desc`]}
              />
            ))}
          </>
        )}
        {value === "personality" && (
          <>
            {range(1, 9).map(item => (
              <Character
                key={item}
                src={`/images/characters/char4-${item}.png`}
                name={texts[`char4_${item}_desc`]}
              />
            ))}
          </>
        )}
      </section>
    </>
  )
}

export default Selector
