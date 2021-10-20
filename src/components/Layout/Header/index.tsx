import { Link } from "gatsby"
import React from "react"

import { Button, IconLogo, TextIcon } from "~/components"

import Socials from "./Socials"
import * as styles from "./styles.module.css"

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <TextIcon icon={<IconLogo size="xlM" />} spacing="base">
          <span className={styles.name}>Travelogers</span>
        </TextIcon>
      </Link>

      <section className={styles.buttons}>
        <Socials />

        <div>
          <Button color="primary" spacingX="1.25rem" spacingY=".5rem">
            參與預購
          </Button>
        </div>

        <div>
          <Button color="primary" spacingX="1.25rem" spacingY=".5rem">
            參與空投
          </Button>
        </div>
      </section>
    </header>
  )
}

export default Header