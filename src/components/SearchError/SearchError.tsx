import { NavLink, useLocation } from "react-router-dom"
import cones from "../../style/images/cones.png"
import "./SearchError.css"

export const SearchError = () => {
  const query = new URLSearchParams(useLocation().search)
  let errorTitle = "",
    content: any = ""

  if (query.get("type") === "invalid_search") {
    errorTitle = "Invalid Search"
    content = (
      <div className="search-error-message">
        <div className="search-error-message-title">404</div>
        <div className="search-error-message-subtitle">
          Search terms:{" "}
          <span className="search-error-highlight">{query.get("terms")}</span>
        </div>

        <div>Your search returned no results.</div>
      </div>
    )
  }

  return (
    <div className="section-block section-full">
      <section className="section-centered">
        <div className="details-table">
          <div className="details-table-header search-error-header">
            <h2>Error: {errorTitle}</h2>
            <div className="details-table-links-box">
              <div className="details-table-header-link">
                <NavLink to="/">
                  <i className="fas fa-home"></i>
                </NavLink>
              </div>
            </div>
          </div>

          <div className="search-error-main">
            {content}
            <div className="search-error-graphic">
              <img src={cones} alt="cones" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
