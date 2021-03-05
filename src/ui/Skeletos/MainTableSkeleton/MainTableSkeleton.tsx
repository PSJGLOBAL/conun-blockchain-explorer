import "../../../style/css/table-common.css"
import "./MainTableSkeleton.css"

export const BlockTableSkeleton = () => {
  return (
    <div className="data-table-row skeleton-table">
      <div className="identicon-cell">&nbsp;</div>
      <div className="blocknum-cell">&nbsp;</div>
      <div className="hash-cell">&nbsp;</div>
      <div className="time-cell">&nbsp;</div>
      <div className="txncount-cell">&nbsp;</div>
    </div>
  )
}
export const TXNTableSkeleton = () => {
  return (
    <div className="data-table-row skeleton-table">
      <div className="identicon-cell">&nbsp;</div>
      <div className="service-cell">&nbsp;</div>
      <div className="hash-cell">&nbsp;</div>
      <div className="time-cell">&nbsp;</div>
    </div>
  )
}
