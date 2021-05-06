import { useSelector } from "react-redux"
import { State } from "../utility/types"

function useChannelHash() {
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)

  const activeChannelHash = activeChannel.channel_genesis_hash

  return activeChannelHash
}

export default useChannelHash
