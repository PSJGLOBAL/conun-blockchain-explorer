import { GraphControls } from "../GraphControls/GraphControls"
import { TheGraph } from "../TheGraph/TheGraph"

export const GraphBlock = () => {
  return (
    <div className="section-block">
      <TheGraph />
      <GraphControls />
    </div>
  )
}
