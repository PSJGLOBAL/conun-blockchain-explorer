import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { State } from "../../utility/types"
import * as actions from "../../store/actions"

export const ChannelProvider = () => {
  console.group("CHANNEL PROVIDER")
  const dispatch = useDispatch()
  const availableChannels = useSelector(
    (state: State) => state.basic.availableChannels
  )
  let cachedChannel = null
  localStorage.getItem("Conun-BCE-Cached-Genesis-Hash")
    ? (cachedChannel = {
        channel_genesis_hash: localStorage.getItem(
          "Conun-BCE-Cached-Genesis-Hash"
        ),
        channel_hash: localStorage.getItem("Conun-BCE-Cached-Hash"),
        channelname: localStorage.getItem("Conun-BCE-Cached-Channel-Name"),
        id: localStorage.getItem("Conun-BCE-Cached-Channel_ID"),
      })
    : (cachedChannel = null)

  useEffect(() => {
    dispatch(actions.getAvailableChannels())
  }, [dispatch])

  // Prevent code running unless this actually has results in it.
  if (availableChannels.length > 0) {
    dispatch(actions.setServerStatus(true))
    console.log(availableChannels)
    if (cachedChannel !== null) {
      // Set channel as cachedChannel object
    }
  } else {
    //If the list is empty, the server will be down.
    dispatch(actions.setServerStatus(false))
  }
  console.groupEnd()
  return null
}
