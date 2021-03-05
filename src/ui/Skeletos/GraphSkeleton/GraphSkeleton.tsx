import "./GraphSkeleton.css"
import "../../../components/MainPage/GraphControls/GraphControls.css"

const GraphSkeleton = () => {
  return (
    <>
      <div className="skeleton skeleton-graph">
        <span className="skeleton-graph-lines">&nbsp;</span>
        <span className="skeleton-graph-lines">&nbsp;</span>
        <span className="skeleton-graph-lines">&nbsp;</span>
        <span className="skeleton-graph-lines">&nbsp;</span>
        <span className="skeleton-graph-lines">&nbsp;</span>
        <span className="skeleton-graph-lines">&nbsp;</span>
        <span className="skeleton-graph-lines">&nbsp;</span>
        <span className="skeleton-graph-lines">&nbsp;</span>
        <span className="skeleton-graph-lines">&nbsp;</span>
        <span className="skeleton-graph-lines">&nbsp;</span>
      </div>
      <div className="graph-controls-table"></div>
    </>
  )
}

export default GraphSkeleton
