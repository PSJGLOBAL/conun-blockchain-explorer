import "./Search.css"
import searchIcon from "../../style/images/search-icon.svg"

export const Search = () => {
  return (
    <div className="search">
      <div className="search-box">
        <img className="search-icon" src={searchIcon} alt="" />
        <input
          className="search-input-field"
          placeholder="Search by block number or Transaction hash"
        />
      </div>
    </div>
  )
}
