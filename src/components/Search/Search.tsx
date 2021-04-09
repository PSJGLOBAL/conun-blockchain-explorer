import { useState, useRef, useEffect } from "react"
import axios from "../../axios/axiosinst"
import { useHistory, useLocation } from "react-router-dom"

import { logger, multiclass } from "../../utility/functions"

import searchIcon from "../../style/images/search-icon.svg"
import style from "./Search.module.css"

const AutoComplete = ({
  results,
  doSelect,
  doSearch,
}: {
  results: Array<string>
  doSelect: (s: string) => void
  doSearch: () => void
}) => {
  const [selected, setSelected] = useState<string>(results[0])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  useEffect(() => {
    setSelected(results[selectedIndex])
  }, [selectedIndex, results])

  function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
    logger("Autocomplete: Keypress: ", "special", event)
  }

  function selection(r: string) {
    setSelected(r)
    setSelectedIndex(results.indexOf(r))
    doSelect(r)
  }

  return (
    <div className={style.autocomplete}>
      {results.map((r) => {
        return (
          <div
            key={r}
            className={
              r === selected
                ? multiclass(style.item, style.selected)
                : style.item
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

  const searchRef = useRef<HTMLInputElement | null>(null)

  let history = useHistory()
  const location = useLocation()

  function doAutoComplete(str: string) {
    if (str.length > 2 && str.startsWith("0x")) {
      axios.get(`/search/wallet/${str}`).then((response) => {
        logger("Autocomplete: ", "get", response)
        if (response.data.status === 200 && response.data.found) {
          // Test Purposes only:
          const dupeWallets = [...response.data.data]
          dupeWallets.push("0xeeeeeeeeeeeee")
          dupeWallets.push("0x348348348348348348")
          setAutoResults(dupeWallets)
          // End test

          // setAutoResults(response.data.data)
        } else {
          setAutoResults(null)
        }
      })
    } else if (autoResults) {
      setAutoResults(null)
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

  useEffect(() => {
    logger("Autocomplete: State: ", "info", autoResults)
  }, [autoResults])

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
            onChange={(e) => {
              handleSearchInput(e.target.value)
              doAutoComplete(e.target.value)
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
        {autoResults && (
          <AutoComplete
            results={autoResults}
            doSelect={setSearchTerms}
            doSearch={doAPISearch}
          />
        )}
      </div>
    </div>
  )
}

export default Search
