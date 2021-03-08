import "./PaginationMenu.css"

type Props = {
  doPseudoPaginate: (mode: string) => void
  currentPage: number
  max: number | string
}

export const PaginationMenu = (props: Props) => {
  return (
    <div className="pagination-container">
      <div className="pagination-indicator">
        {`${(props.currentPage * 10).toString()} of ${props.max}`}
      </div>
      <div className="pagination-buttons">
        <div
          className="pagination-button pagination-text-cell"
          onClick={() => {
            props.doPseudoPaginate("first")
          }}
        >
          <i className="fas fa-caret-left pagination-icon"></i>
          <i className="fas fa-caret-left pagination-icon"></i>
        </div>
        <div
          className="pagination-button pagination-icon-cell"
          onClick={() => {
            props.doPseudoPaginate("prev")
          }}
        >
          <i className="fas fa-caret-left pagination-icon"></i>
        </div>
        <div
          className="pagination-button pagination-icon-cell"
          onClick={() => {
            props.doPseudoPaginate("next")
          }}
        >
          <i className="fas fa-caret-right pagination-icon"></i>
        </div>
      </div>
    </div>
  )
}
