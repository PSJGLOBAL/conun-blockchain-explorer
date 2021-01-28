import { ChannelStats } from "../../components/ChannelStats/ChannelStats"
import { GraphBlock } from "../../components/GraphBlock/GraphBlock"

export const StatsBlock = () => {
  return (
    <section className="splitcolumns">
      <ChannelStats />
      <GraphBlock />
    </section>
  )
}
