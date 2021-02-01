import { ExplorerInfoBlock } from "../ExplorerInfoBlock/ExplorerInfoBlock"
import { GraphBlock } from "../../components/MainPage/GraphBlock/GraphBlock"

export const StatsBlock = () => {
  return (
    <section className="splitcolumns">
      <ExplorerInfoBlock />
      <GraphBlock />
    </section>
  )
}
