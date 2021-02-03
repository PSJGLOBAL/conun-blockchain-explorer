import { useSelector } from "react-redux"
import { State } from "../../../utility/types"
import "./ChannelStats.css"
import blocksIcon from "../../../style/images/blocks-icon.svg"
import txnIcon from "../../../style/images/txn-icon.svg"

export const ChannelStats = () => {
  const channelStats = useSelector((state: State) => state.basic.channelStats)
  return (
    <div className="channel-stats-table">
      <div className="channel-stats-icon-col">
        <img src={blocksIcon} className="channel-stats-icon" alt="" />
      </div>
      <div className="channel-stats-data-col">
        {channelStats.latestBlock} Blocks
      </div>
      <div className="channel-stats-icon-col">
        <img src={txnIcon} className="channel-stats-icon" alt="" />
      </div>
      <div className="channel-stats-data-col">{channelStats.txCount} Txns</div>
    </div>
  )
}

// ,
