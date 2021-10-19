import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"

import * as styles from "./styles.module.css"

const Header = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header className={styles.header}>
      <Link to="/">Logo</Link>

      <section>Buttons</section>
    </header>
  )
}

export default Header
