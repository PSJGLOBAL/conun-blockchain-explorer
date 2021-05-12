import style from "./PaginationMenu.module.css"

type Props = {
  doPseudoPaginate: (mode: string) => void
  currentPage: number
  max?: number | string | null
  noPrev?: boolean
}

const PaginationMenu = (props: Props) => {
  return (
    <div className={style.pagination}>
      <div className={style.indicator}>
        {props.max && `${props.currentPage.toString()} of ${props.max}`}
      </div>
      <div className={style.buttonBox}>
        <div
          className={style.label}
          id="pagination-first"
          onClick={() => {
            props.doPseudoPaginate("first")
          }}
        >
          <i className="fas fa-caret-left"></i>
          <i className="fas fa-caret-left"></i>
        </div>
        {!props.noPrev && (
          <div
            className={style.label}
            id="pagination-previous"
            onClick={() => {
              props.doPseudoPaginate("prev")
            }}
          >
            <i className="fas fa-caret-left"></i>
          </div>
        )}

        <div
          className={style.label}
          id="pagination-next"
          onClick={() => {
            props.doPseudoPaginate("next")
          }}
        >
          <i className="fas fa-caret-right"></i>
        </div>
      </div>
    </div>
  )
}

export default PaginationMenu
