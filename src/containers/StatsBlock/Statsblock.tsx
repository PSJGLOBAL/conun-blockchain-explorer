import { ExplorerInfoBlock } from "../ExplorerInfoBlock/ExplorerInfoBlock"
import { GraphBlock } from "../../components/GraphBlock/GraphBlock"

export const StatsBlock = () => {
  return (
    <section className="splitcolumns">
      <ExplorerInfoBlock />
      <GraphBlock />
    </section>
  )
}
