import { useState, useEffect, useRef } from "react"
import axios from "../../axios/axiosinst"

import searchIcon from "../../style/images/search-icon.svg"
import "./Search.css"

export const Search = () => {
  const [searchTerms, setSearchTerms] = useState<string>("")
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")
  const [display, setDisplay] = useState<string>("")

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
      <div></div>
    </div>
  )
}
