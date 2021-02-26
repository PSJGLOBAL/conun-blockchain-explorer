import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { setChannelStats } from "../../../store/actions"

import { State } from "../../../utility/types"
import "./ChannelStats.css"
import blocksIcon from "../../../style/images/blocks-icon.svg"
import txnIcon from "../../../style/images/txn-icon.svg"

export const ChannelStats = () => {
  const dispatch = useDispatch()
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  // Get channel stats directly from this component
  // This means the channel provider is loaded and executed before this. More reliable.
  useEffect(() => {
    if (activeChannelHash && activeChannelHash !== "") {
      dispatch(setChannelStats(activeChannelHash.toString()))
    }
  }, [activeChannel, activeChannelHash, dispatch])

  const channelStats = useSelector((state: State) => state.basic.channelStats)
  // console.log("CHANNEL STATS: ", channelStats)
  return (
    <div className="channel-stats-table">
      {/* Blocks */}
      <div className="channel-stats-column">
        <div className="channel-stats-icon-cell">
          <img src={blocksIcon} className="channel-stats-icon" alt="" />
        </div>
        <div className="channel-stats-data-cell">
          <span className="channel-stats-datapoint">
            {channelStats.latestBlock || "Counting"}
          </span>
          <span className="channel-stats-datapoint-label">Blocks</span>
        </div>
      </div>
      {/* TXNS */}
      <div className="channel-stats-column">
        <div className="channel-stats-icon-cell">
          <img src={txnIcon} className="channel-stats-icon" alt="" />
        </div>
        <div className="channel-stats-data-cell">
          <span className="channel-stats-datapoint">
            {channelStats.txCount || "Counting"}
          </span>
          <span className="channel-stats-datapoint-label">Txns</span>
        </div>
      </div>
    </div>
  )
}
