import localStyle from "./ContractSkeleton.module.css"
import tableStyle from "../../../pages/Contracts/ContractDetails/ContractDetailTable/ContractDetailTable.module.css"
import skeleton from "../MainTableSkeleton/MainTableSkeleton.module.css"

export const ContractDetailTableSkeleton = () => {
  return (
    <div className={`${tableStyle.table} ${skeleton.table}`}>
      <div className={tableStyle.cell}>
        <div className={tableStyle.title}>&nbsp;</div>
        <div className={tableStyle.content}>&nbsp;</div>
      </div>
      <div className={tableStyle.cell}>
        <div className={tableStyle.title}>&nbsp;</div>
        <div className={tableStyle.content}>&nbsp;</div>
      </div>
      <div className={tableStyle.cell}>
        <div className={tableStyle.title}>&nbsp;</div>
        <div className={tableStyle.content}>&nbsp;</div>
      </div>
      <div className={tableStyle.cell}>
        <div className={tableStyle.title}>&nbsp;</div>
        <div className={tableStyle.content}>&nbsp;</div>
      </div>
    </div>
  )
}
export const ContractTextSkeleton = () => {
  return (
    <div className={`${localStyle.container} ${skeleton.table}`}>
      <div className={localStyle.description}></div>
    </div>
  )
}
