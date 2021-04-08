import { useState, useRef, useEffect } from "react"
import axios from "../../axios/axiosinst"
import { useHistory, useLocation } from "react-router-dom"

// import { ObjectType } from "../../utility/types"
import { logger } from "../../utility/functions"

import searchIcon from "../../style/images/search-icon.svg"
import style from "./Search.module.css"

const Search = () => {
  const [searchTerms, setSearchTerms] = useState<string>("")
  const [searchFail, setSearchFail] = useState<string>("")

  const searchRef = useRef<HTMLInputElement | null>(null)

  let history = useHistory()
  const location = useLocation()

  function handleSearchInput(str: string) {
    setSearchTerms(str)
  }

  function clearSearch() {
    setSearchTerms("")
    setSearchFail("")
  }

  // Use the current location to trigger a search bar reset/rerender
  useEffect(() => {
    // console.log("SEARCH: Path changed: ", location)
    clearSearch()
  }, [location])

  function doAPISearch() {
    if (searchTerms !== "") {
      axios
        .get(`/search/hash/${searchTerms}`)
        .then((response) => {
          logger("Search Response: ", "get", response)

          if (response.data.found) {
            switch (response.data.data) {
              case "block":
                history.push(`/blocks/${searchTerms}`)
                break
              case "transaction":
                history.push(`/txns/${searchTerms}`)
                break
              case "wallet":
                history.push(`/wallets/${searchTerms}`)
                break
              default:
                setSearchFail("Response was an invalid type!")
              //case 3: //It's the wallet type
            }
          } else {
            setSearchFail("Invalid search terms.")
            history.push(`/error?type=invalid_search&terms=${searchTerms}`)
          }
        })
        .catch((e) => {
          console.error(e)
          setSearchFail("Oops! There was no response.")
        })
    }
  }

  return (
    <div className={style.searchContainer} id="main">
      <div className={style.search}>
        <input
          ref={searchRef}
          id="search-input"
          placeholder={
            searchFail
              ? searchFail
              : "Search by block number or transaction hash"
          }
          value={searchTerms}
          onChange={(e) => {
            handleSearchInput(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setSearchFail("")
              doAPISearch()
              setSearchTerms("")
            }
          }}
        />
        <img
          className={style.icon}
          id="search-button"
          src={searchIcon}
          alt="search"
          onClick={() => {
            setSearchFail("")
            doAPISearch()
            setSearchTerms("")
          }}
        />
      </div>
    </div>
  )
}

export default Search
