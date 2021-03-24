import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { setChannelStats } from "../../../store/actions"

import { State } from "../../../utility/types"
import style from "./ChannelStats.module.css"
import blocksIcon from "../../../style/images/blocks-icon.svg"
import txnIcon from "../../../style/images/txn-icon.svg"

const ChannelStats = () => {
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
    <div className={style.table}>
      {/* Blocks */}
      <div className={style.column}>
        <div className={style.icon}>
          <img src={blocksIcon} alt="" />
        </div>
        <div className={style.data}>
          <span id="stats-total-blocks">
            {channelStats.latestBlock
              ? parseInt(
                  channelStats.latestBlock.toString(),
                  10
                ).toLocaleString()
              : "Many"}
          </span>
          <span className={style.label}>Blocks</span>
        </div>
      </div>
      {/* TXNS */}
      <div className={style.column}>
        <div className={style.icon}>
          <img src={txnIcon} alt="" />
        </div>
        <div className={style.data}>
          <span id="stats-total-txns">
            {channelStats.txCount
              ? parseInt(channelStats.txCount.toString(), 10).toLocaleString()
              : "Many"}
          </span>
          <span className={style.label}>Txns</span>
        </div>
      </div>
    </div>
  )
}

export default ChannelStats
