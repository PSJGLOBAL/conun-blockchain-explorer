import ExplorerInfoBlock from "../ExplorerInfoBlock/ExplorerInfoBlock"
import GraphBlock from "../../components/MainPage/GraphBlock/GraphBlock"

const StatsBlock = () => {
  return (
    <section className="splitcolumns">
      <ExplorerInfoBlock />
      <GraphBlock />
    </section>
  )
}
export default StatsBlock
