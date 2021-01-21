import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as actions from "../../store/actions"
import { State } from "../../utility/types"

function SelectChannel() {
  const dispatch = useDispatch()
  const availableChannels = useSelector(
    (state: State) => state.basic.availableChannels
  )
  const channelHash = useSelector((state: State) => state.basic.channelHash)
  const [selectedChannel, setSelectedChannel] = useState<string>("")

  useEffect(() => {
    dispatch(actions.getAvailableChannels())
  }, [dispatch])

  useEffect(() => {
    console.log("Select Channels: Available Channels: ", availableChannels)
  }, [availableChannels])

  const selectOptions = availableChannels.map((c) => {
    return (
      <option key={c.id} value={c.channel_genesis_hash}>
        {c.channelname}
      </option>
    )
  })

  useEffect(() => {
    const previousChannel = localStorage.getItem("selectedChannel")
    if (previousChannel) {
      setSelectedChannel(previousChannel)
      console.log("Select Channel: User has existing channel")
    } else {
      console.log("Select Channel: No existing channel detected")
    }
  }, [])

  const handleSelect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(selectedChannel)
    localStorage.setItem("selectedChannel", selectedChannel)
  }

  return (
    <div>
      <div>{channelHash}</div>
      <form onSubmit={handleSelect}>
        <select
          value={selectedChannel}
          onChange={(e) => {
            setSelectedChannel(e.target.value)
            console.log("Select Channel: Selected a channel: ", e.target.value)
          }}
        >
          {selectOptions}
        </select>
        <button type="submit">Change Channel</button>
      </form>
    </div>
  )
}
export default SelectChannel
