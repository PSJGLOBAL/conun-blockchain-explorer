import { useState, useRef, useEffect } from "react"
import axios from "../../axios/axiosinst"
import { useHistory, useLocation } from "react-router-dom"

import { logger, multiclass } from "../../utility/functions"

import searchIcon from "../../style/images/search-icon.svg"
import style from "./Search.module.css"

const AutoComplete = ({
  results,
  selected,
  setSelected,
  doSearch,
}: {
  results: Array<string>
  selected: string
  setSelected: (s: string) => void
  doSearch: () => void
}) => {
  function selection(r: string) {
    setSelected(r)
  }

  return (
    <div className={style.autocomplete} onKeyPress={(e) => console.log(e)}>
      {results.map((r) => {
        return (
          <div
            key={r}
            className={
              r === selected
                ? multiclass(style.item, style.selected, "autocomplete-option")
                : multiclass(style.item, "autocomplete-option")
            }
            onMouseOver={() => {
              console.log(r)
              selection(r)
            }}
            onClick={() => doSearch()}
          >
            {r}
          </div>
        )
      })}
    </div>
  )
}

const Search = () => {
  const [searchTerms, setSearchTerms] = useState<string>("")
  const [searchFail, setSearchFail] = useState<string>("")

  const [autoResults, setAutoResults] = useState<Array<string> | null>(null)
  const [autoSelection, setAutoSelection] = useState<string>("")

  const searchRef = useRef<HTMLInputElement | null>(null)

  let history = useHistory()
  const location = useLocation()

  function doAutoComplete(str: string) {
    if (str.length > 2 && str.startsWith("0x")) {
      axios.get(`/search/wallet/${str}`).then((response) => {
        logger("Autocomplete: ", "get", response)
        if (response.data.status === 200 && response.data.found) {
          setAutoResults(response.data.data)
        } else {
          setAutoResults(null)
        }
      })
    } else if (autoResults) {
      setAutoResults(null)
    }
  }

  function autoCompleteKeySelection(current: string, direction: "up" | "down") {
    if (autoResults) {
      const currentIndex: number = autoResults?.indexOf(current) || 0

      if (direction === "up") {
        if (currentIndex > 0) {
          setAutoSelection(autoResults[currentIndex - 1])
        }
      } else if (direction === "down") {
        if (currentIndex < autoResults.length - 1)
          setAutoSelection(autoResults[currentIndex + 1])
      }
    }
  }

  function handleSearchInput(str: string) {
    setSearchTerms(str)
  }

  function clearSearch() {
    setSearchTerms("")
    setSearchFail("")
    setAutoResults(null)
  }

  // Use the current location to trigger a search bar reset/rerender
  useEffect(() => {
    clearSearch()
  }, [location])

  // When autocomplete box appears, set top element to be selected
  // useEffect(() => {
  //   logger("Autocomplete: State: ", "info", autoResults)
  //   if (!autoSelection) {
  //     if (autoResults && autoResults.length > 0) {
  //       setAutoSelection(autoResults[0])
  //     }
  //   }
  // }, [autoResults, autoSelection])

  // If something is selected, set that to be the search terms
  useEffect(() => {
    if (autoSelection) {
      setSearchTerms(autoSelection)
    }
  }, [autoSelection])

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
      setAutoSelection("")
      setAutoResults(null)
    }
  }

  function doKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setSearchFail("")
      doAPISearch()
      setSearchTerms("")
    } else if (e.key === "Escape") {
      setAutoSelection("")
      setAutoResults(null)
    } else if (e.key === "ArrowUp") {
      autoCompleteKeySelection(autoSelection, "up")
    } else if (e.key === "ArrowDown") {
      autoCompleteKeySelection(autoSelection, "down")
    } else if (e.key === "ArrowRight") {
      if (autoSelection) {
        setSearchTerms(autoSelection)
      } else {
        if (autoResults) {
          setAutoSelection(autoResults[0])
          setSearchTerms(autoResults[0])
        }
      }
    }
  }

  return (
    <div className={style.searchBlock}>
      <div className={style.searchContainer}>
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
            spellCheck="false"
            onChange={(e) => {
              handleSearchInput(e.target.value)
              doAutoComplete(e.target.value)
            }}
            onKeyDown={(e) => doKeyDown(e)}
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
        {autoResults && (
          <AutoComplete
            results={autoResults}
            selected={autoSelection}
            setSelected={setAutoSelection}
            doSearch={doAPISearch}
          />
        )}
      </div>
    </div>
  )
}

export default Search
