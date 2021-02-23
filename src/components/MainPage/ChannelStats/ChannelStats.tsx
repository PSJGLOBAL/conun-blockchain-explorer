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
      <div className="channel-stats-icon-col">
        <img src={blocksIcon} className="channel-stats-icon" alt="" />
      </div>
      <div className="channel-stats-data-col">
        {channelStats.latestBlock || "Counting"} Blocks
      </div>
      <div className="channel-stats-icon-col">
        <img src={txnIcon} className="channel-stats-icon" alt="" />
      </div>
      <div className="channel-stats-data-col">
        {channelStats.txCount || "Counting"} Txns
      </div>
    </div>
  )
}
