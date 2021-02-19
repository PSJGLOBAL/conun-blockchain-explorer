import "./PaginationMenu.css"

type Props = {
  doPseudoPaginate: (mode: string) => void
}

export const PaginationMenu = (props: Props) => {
  return (
    <div className="pagination-container">
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
  )
}
