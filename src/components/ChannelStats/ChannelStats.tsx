import { useSelector } from "react-redux"
import { State } from "../../utility/types"
import "./ChannelStats.css"

export const ChannelStats = () => {
  const channelStats = useSelector((state: State) => state.basic.channelStats)
  return (
    <div className="channel-stats-table">
      <div className="channel-stats-icon-col">
        <i className="fas fa-th font-hilite"></i>
      </div>
      <div className="channel-stats-data-col">
        {channelStats.latestBlock} Blocks
      </div>
      <div className="channel-stats-icon-col">
        <i className="fas fa-bars font-hilite"></i>
      </div>
      <div className="channel-stats-data-col">{channelStats.txCount} Txns</div>
    </div>
  )
}

// ,
