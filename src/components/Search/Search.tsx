import { useState, useEffect, useRef } from "react"
import axios from "../../axios/axiosinst"
import { Redirect } from "react-router-dom"

// import { ObjectType } from "../../utility/types"

import searchIcon from "../../style/images/search-icon.svg"
import "./Search.css"

export const Search = () => {
  const [searchTerms, setSearchTerms] = useState<string>("")
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [result, setResult] = useState<any>(null)
  const [display, setDisplay] = useState<any>("")

  const searchRef = useRef<HTMLInputElement | null>(null)

  // Need a clear search button,
  // A search successful button,
  // A button that will let you go to what the search returned
  // Also if the user presses enter, then they can go to that page - if the search is successful

  // -- There will be a search result state and only if this contains something, a URL or something, then pressing enter will push that url.

  function handleSearchInput(str: string) {
    setSearchTerms(str)
    setHasSearched(false)
  }

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      // const currentSearch = searchRef.current?.value
      if (hasSearched === false && searchTerms !== "") {
        axios
          .get(`/search/hash/${searchTerms}`)
          .then((response) => {
            setResult(response.data)
          })
          .catch((e) => console.error(e))
      }
      setHasSearched(true)
    }, 700)

    return () => {
      clearTimeout(searchTimer)
    }
  })

  useEffect(() => {
    if (result) {
      //This function will be used to evaluate the results - if the search was successful, set result to a link
      console.log("SEARCH: RESULT: ", result)
      if (result.found === true) {
        switch (result.data.data_type) {
          case 1:
            setDisplay(<Redirect to={`/blocks/${result.data.id}`} />)
            setSearchTerms("")
            setHasSearched(false)
            break
          case 2:
            setDisplay(<Redirect to={`/txns/${result.data.id}`} />)
            setSearchTerms("")
            setHasSearched(false)
            break
          case 3:
            setDisplay("Wallet")
            break
          default:
            setDisplay(result.data.data_type)
        }
      }
    }
  }, [result])

  return (
    <div className="search">
      <div className="search-box">
        <img className="search-icon" src={searchIcon} alt="" />
        <input
          ref={searchRef}
          className="search-input-field"
          placeholder="Search by block number or Transaction hash"
          value={searchTerms}
          onChange={(e) => {
            handleSearchInput(e.target.value)
          }}
        />
      </div>
      <div>{display}</div>
    </div>
  )
}
