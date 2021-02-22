import { useState, useRef, useEffect } from "react"
import axios from "../../axios/axiosinst"
import { useHistory, useLocation } from "react-router-dom"

// import { ObjectType } from "../../utility/types"

import searchIcon from "../../style/images/search-icon.svg"
import "./Search.css"

export const Search = () => {
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
    console.log("SEARCH: Path changed: ", location)
    clearSearch()
  }, [location])

  function doAPISearch() {
    if (searchTerms !== "") {
      axios
        .get(`/search/hash/${searchTerms}`)
        .then((response) => {
          // setResult(response.data)
          const data = response.data

          if (data.status === 200) {
            const responseType = data.data.data_type

            switch (responseType) {
              case 1:
                history.push(`/blocks/${data.data.id}`)
                break
              case 2:
                history.push(`/txns/${data.data.id}`)
                break
              default:
                setSearchFail("Response was an invalid type!")
              //case 3: //It's the wallet type
            }
          } else {
            setSearchFail("Invalid search terms.")
          }
        })
        .catch((e) => {
          console.error(e)
          setSearchFail("Oops! There was no response.")
        })
    }
  }

  return (
    <div className="search">
      <div className="search-box">
        <img
          className="search-icon"
          src={searchIcon}
          alt=""
          onClick={() => {
            setSearchFail("")
            doAPISearch()
            setSearchTerms("")
          }}
        />
        <input
          ref={searchRef}
          className="search-input-field"
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
        <div className="search-error-icon" onClick={clearSearch}>
          {searchFail ? (
            <i className="fas fa-exclamation-circle" />
          ) : searchTerms ? (
            <i className="fas fa-times-circle"></i>
          ) : null}
          {/* {searchTerms ? (
            searchFail ? (
              <i className="fas fa-exclamation-circle" />
            ) : (
              <i className="fas fa-times-circle"></i>
            )
          ) : null} */}
        </div>
      </div>
    </div>
  )
}
