import style from "../../../components/Details/Details.module.css"
import skeleton from "../MainTableSkeleton/MainTableSkeleton.module.css"
const DetailsSkeleton = () => {
  return (
    <div className={`${style.row} ${skeleton.table}`}>
      <div className={style.col}>&nbsp;</div>
      <div className={style.col}>&nbsp;</div>
    </div>
  )
}
export default DetailsSkeleton
