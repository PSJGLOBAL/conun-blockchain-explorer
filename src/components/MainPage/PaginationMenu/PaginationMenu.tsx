import "./PaginationMenu.css"

export const PaginationMenu = () => {
  return (
    <div className="pagination-container">
      <div className="pagination-button pagination-text-cell">
        <i className="fas fa-caret-left pagination-icon"></i>
        <i className="fas fa-caret-left pagination-icon"></i>
      </div>
      <div className="pagination-button pagination-icon-cell">
        <i className="fas fa-caret-left pagination-icon"></i>
      </div>
      <div className="pagination-button pagination-icon-cell">
        <i className="fas fa-caret-right pagination-icon"></i>
      </div>
    </div>
  )
}
