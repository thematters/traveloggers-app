import React from "react"

import * as styles from "./styles.module.css"

const Subitle: React.FC = ({ children }) => {
  return <h4 className={styles.subtitle}>{children}</h4>
}

export default Subitle
