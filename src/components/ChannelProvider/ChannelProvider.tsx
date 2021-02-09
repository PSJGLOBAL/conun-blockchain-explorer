import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  setBlockActivityData,
  setTxnActivityData,
  setChannelInfo,
  setChannelStats,
} from "../../store/actions"
import { State } from "../../utility/types"

export const ChannelProvider = () => {
  const dispatch = useDispatch()

  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  // If the channel hash is loaded, get the rest of the data
  useEffect(() => {
    if (activeChannelHash && activeChannelHash !== "") {
      dispatch(setChannelInfo(activeChannel)) // Set Channel Info
      dispatch(setBlockActivityData(activeChannelHash.toString())) // Get Block Activity - Redux Action performs API call
      dispatch(setTxnActivityData(activeChannelHash.toString())) // Get Block Activity - Redux Action performs API call
      dispatch(setChannelStats(activeChannelHash.toString()))
    }
  }, [activeChannelHash, activeChannel, dispatch])

  return null
}
