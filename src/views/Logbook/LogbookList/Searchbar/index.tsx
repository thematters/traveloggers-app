import { useLocalization } from "gatsby-theme-i18n"
import React, { useEffect, useRef, useState } from "react"
import { useDebounce } from "use-debounce"

import { IconClear, IconSearch } from "~/components"
import { Lang } from "~/enums"
import {
  analytics,
  // retrieveNFT
} from "~/utils"

import * as styles from "./styles.module.css"

type SearchBarProps = {
  onSearch: (searchTerm: string) => void
}

const MIN_TOKEN_ID = 1
const MAX_TOKEN_ID = 1500

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { locale } = useLocalization()

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedTerm] = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (debouncedTerm === "") {
      onSearch(debouncedTerm)
      return
    }

    const tokenId = parseInt(debouncedTerm)

    if (!tokenId || tokenId < MIN_TOKEN_ID || tokenId > MAX_TOKEN_ID) {
      return
    }

    onSearch(debouncedTerm)
  }, [debouncedTerm])

  return (
    <section className={styles.searchBar}>
      <input
        ref={searchInputRef}
        type="number"
        min={MIN_TOKEN_ID}
        max={MAX_TOKEN_ID}
        placeholder={
          locale === Lang.en
            ? "Enter Traveloggers' ID number (from 1-1500)"
            : "輸入 Traveloggers ID (1 至 1500)"
        }
        onChange={event => setSearchTerm(event.target.value)}
      />

      <button
        className={styles.search}
        onClick={() => {
          searchInputRef.current?.focus()
          analytics("click_button", { type: "logbooks_search" })
        }}
      >
        <IconSearch />
      </button>

      {searchTerm.length > 0 && (
        <button
          className={styles.clear}
          onClick={() => {
            if (searchInputRef.current) searchInputRef.current.value = ""
            setSearchTerm("")
            searchInputRef.current?.focus()
            analytics("click_button", { type: "logbooks_clear" })
          }}
        >
          <IconClear />
        </button>
      )}
    </section>
  )
}

export default SearchBar
