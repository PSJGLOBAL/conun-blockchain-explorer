import tableStyle from "../../../style/css/maintables.module.css"
import skeleton from "./MainTableSkeleton.module.css"

export const BlockTableSkeleton = () => {
  return (
    <div className={`${tableStyle.row} ${skeleton.table}`}>
      <div className={tableStyle.identicon}>&nbsp;</div>
      <div className={tableStyle.blocknum}>&nbsp;</div>
      <div className={tableStyle.hash}>&nbsp;</div>
      <div className={tableStyle.time}>&nbsp;</div>
      <div className={tableStyle.txncount}>&nbsp;</div>
    </div>
  )
}
export const TXNTableSkeleton = () => {
  return (
    <div className={`${tableStyle.row} ${skeleton.table}`}>
      <div className={tableStyle.iconCell}>&nbsp;</div>
      <div className={tableStyle.hashCell}>&nbsp;</div>
      <div className={tableStyle.iconCell}>&nbsp;</div>
      <div className={tableStyle.hashCell}>&nbsp;</div>
      <div className={tableStyle.actionCell}>&nbsp;</div>
    </div>
  )
}
