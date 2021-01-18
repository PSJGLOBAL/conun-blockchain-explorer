import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as actions from "../../store/actions"

interface IObjectKeys {
  [key: string]: string | number
}

type State = {
  channelHash: string
  availableChannels: Array<IObjectKeys>
  serverResponsive: boolean
  channelInfoData: IObjectKeys
}

function SelectChannel() {
  const dispatch = useDispatch()
  const availableChannels = useSelector(
    (state: State) => state.availableChannels
  )

  useEffect(() => {
    dispatch(actions.getAvailableChannels())
    console.log("Available Channels: ", availableChannels)
  }, [])

  return null
}
export default SelectChannel
