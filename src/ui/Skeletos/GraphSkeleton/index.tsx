import style from "../../../pages/MainPage/GraphControls/GraphControls.module.css"
import skeleton from "./GraphSkeleton.module.css"

const GraphSkeleton = () => {
  return (
    <>
      <div className={skeleton.graph}>
        <span className={skeleton.line}>&nbsp;</span>
        <span className={skeleton.line}>&nbsp;</span>
        <span className={skeleton.line}>&nbsp;</span>
        <span className={skeleton.line}>&nbsp;</span>
        <span className={skeleton.line}>&nbsp;</span>
        <span className={skeleton.line}>&nbsp;</span>
        <span className={skeleton.line}>&nbsp;</span>
        <span className={skeleton.line}>&nbsp;</span>
        <span className={skeleton.line}>&nbsp;</span>
        <span className={skeleton.line}>&nbsp;</span>
        <span className={skeleton.line}>&nbsp;</span>
      </div>
      <div className={style.table}></div>
    </>
  )
}

export default GraphSkeleton
