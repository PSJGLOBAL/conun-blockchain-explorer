import { useState, useEffect } from "react"

import searchIcon from "../../style/images/search-icon.svg"
import "./Search.css"

export const Search = () => {
  const [searchTerms, setSearchTerms] = useState<string>("")
  const [result, setResult] = useState<string>("")

  // Need a clear search button,
  // A search successful button,
  // A button that will let you go to what the search returned
  // Also if the user presses enter, then they can go to that page - if the search is successful

  // -- There will be a search result state and only if this contains something, a URL or something, then pressing enter will push that url.

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      setResult(searchTerms)
    }, 700)

    return () => {
      clearTimeout(searchTimer)
    }
  })

  return (
    <div className="search">
      <div className="search-box">
        <img className="search-icon" src={searchIcon} alt="" />
        <input
          className="search-input-field"
          placeholder="Search by block number or Transaction hash"
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
        />
      </div>
      <div>{result}</div>
    </div>
  )
}
