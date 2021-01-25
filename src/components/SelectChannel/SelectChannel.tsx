import { useSelector, useDispatch } from "react-redux"
import * as actions from "../../store/actions"
import { State, ChannelObject } from "../../utility/types"
import "./SelectChannel.css"

function SelectChannel() {
  const dispatch = useDispatch()
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const serverResponse = useSelector(
    (state: State) => state.basic.serverResponsive
  )
  const availableChannels = useSelector(
    (state: State) => state.basic.availableChannels
  )
  //Add fake channel for test purposes

  // const fakeChannelList = availableChannels.concat([
  //   {
  //     id: 80,
  //     channelname: "Null Channel",
  //     channel_genesis_hash: "Null Hash",
  //     channel_hash: "this field doesn't do anything",
  //     createdat: "just now",
  //   },
  // ])

  const setCachedChannel = (channel: ChannelObject) => {
    console.log("SELECT CHANNEL: Setting Cached Channel: ", channel.channelname)
    localStorage.setItem(
      "Conun-BCE-Cached-Genesis-Hash",
      channel.channel_genesis_hash
    )
    localStorage.setItem("Conun-BCE-Cached-Hash", channel.channel_hash)
    localStorage.setItem("Conun-BCE-Cached-Channel-Name", channel.channelname)
    localStorage.setItem("Conun-BCE-Cached-Channel-ID", channel.id)
    localStorage.setItem("Conun-BCE-Cached-Created", channel.createdat)
  }

  const handleChannelSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target

    // Extract the right channel object based on the channel hash
    const newChannel = availableChannels.filter((i) => {
      return i.channel_genesis_hash === value
    })[0] // [0] because realistically, there should only be one.

    setCachedChannel({
      id: newChannel.id.toString(),
      channelname: newChannel.channelname.toString(),
      channel_genesis_hash: newChannel.channel_genesis_hash.toString(),
      channel_hash: newChannel.channel_hash.toString(),
      createdat: newChannel.createdat.toString(),
    })
    dispatch(
      actions.setActiveChannel({
        id: newChannel.id.toString(),
        channelname: newChannel.channelname.toString(),
        channel_genesis_hash: newChannel.channel_genesis_hash.toString(),
        channel_hash: newChannel.channel_hash.toString(),
        createdat: newChannel.createdat.toString(),
      })
    )
  }

  return (
    <div>
      <select
        className="channel-selector"
        value={activeChannel.channel_genesis_hash?.toString()}
        onChange={(e) => {
          handleChannelSelection(e)
        }}
      >
        {availableChannels.map((i) => {
          return (
            <option key={i.id} value={i.channel_genesis_hash}>
              {i.channelname}
            </option>
          )
        })}
      </select>
      <span className="channel-selector-hash">
        {serverResponse
          ? activeChannel.channel_genesis_hash !== ""
            ? activeChannel.channel_genesis_hash
            : "Loading"
          : "Server Unresponsive"}
      </span>
    </div>
  )
}
export default SelectChannel
