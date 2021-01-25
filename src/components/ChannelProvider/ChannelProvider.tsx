import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { State } from "../../utility/types"
import * as actions from "../../store/actions"

export const ChannelProvider = (props: any) => {
  const dispatch = useDispatch()
  const availableChannels = useSelector(
    (state: State) => state.basic.availableChannels
  )

  // Attempt to load the channel the user last used

  useEffect(() => {
    dispatch(actions.getAvailableChannels())
  }, [dispatch])

  useEffect(() => {
    let cachedChannel = null
    if (localStorage.getItem("Conun-BCE-Cached-Genesis-Hash")) {
      cachedChannel = {
        channel_genesis_hash:
          localStorage.getItem("Conun-BCE-Cached-Genesis-Hash") || "",
        channel_hash: localStorage.getItem("Conun-BCE-Cached-Hash") || "",
        channelname:
          localStorage.getItem("Conun-BCE-Cached-Channel-Name") || "",
        id: localStorage.getItem("Conun-BCE-Cached-Channel-ID") || "",
        createdat: localStorage.getItem("Conun-BCE-Cached-Created") || "",
      }
    }

    // Prevent code running unless this actually has results in it.
    if (availableChannels.length > 0) {
      dispatch(actions.setServerStatus(true))
      console.log(availableChannels)

      if (cachedChannel !== null) {
        // If the user has a previously used channel, set it here
        console.log("CHANNEL PROVIDER: Cached channel detected")
        dispatch(actions.setActiveChannel(cachedChannel))
      } else {
        // Else, set the active channel to be the first channel in the list
        console.log("CHANNEL PROVIDER: No cached channel found")
        dispatch(
          actions.setActiveChannel({
            id: availableChannels[0].id.toString(),
            channelname: availableChannels[0].channelname.toString(),
            channel_genesis_hash: availableChannels[0].channel_genesis_hash.toString(),
            channel_hash: availableChannels[0].channel_hash.toString(),
            createdat: availableChannels[0].createdat.toString(),
          })
        )
      }
    } else {
      //If the list is empty, the server will be down.
      dispatch(actions.setServerStatus(false))
    }
  }, [availableChannels, dispatch])
  return (
    <>{availableChannels.length > 0 ? props.children : <div>NO CHANNEL</div>}</>
  )
}
