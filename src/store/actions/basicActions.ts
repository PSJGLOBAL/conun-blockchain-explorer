import axios from "../../axios/axiosinst"

import {
  GET_AVAILABLE_CHANNELS,
  SET_CHANNEL_HASH,
  SET_SERVER_STATUS,
  SET_CHANNEL_INFO,
  SET_CHANNEL_STATS,
  SET_ACTIVE_CHANNEL,
} from "./actionTypes"

//Type for object
import { ObjectType, ChannelObject } from "../../utility/types"

const assembleAvailableChannels = (data: Array<ObjectType>) => {
  return { type: GET_AVAILABLE_CHANNELS, payload: { availableChannels: data } }
}

export const setChannelHash = (hash: string) => {
  return { type: SET_CHANNEL_HASH, payload: { hash: hash } }
}
export const setActiveChannel = (channelData: ChannelObject) => {
  return { type: SET_ACTIVE_CHANNEL, payload: { channelData: channelData } }
}

export const setServerStatus = (responsive: boolean) => {
  return { type: SET_SERVER_STATUS, payload: { responsive: responsive } }
}

export const setChannelInfo = (data: ChannelObject) => {
  return { type: SET_CHANNEL_INFO, payload: { channelInfoData: data } }
}
const assembleChannelStats = (data: ObjectType) => {
  return { type: SET_CHANNEL_STATS, payload: { channelStats: data } }
}

export const getAvailableChannels = () => {
  return (dispatch: any) => {
    axios
      .get("/channels/info")
      .then((response) => {
        // console.log(
        //   "Available Channels: ",
        //   response.status,
        //   response.statusText
        // )
        // console.log("Available Channels: ", response.data.channels)
        dispatch(assembleAvailableChannels(response.data.channels))
      })
      .catch((e) => console.error(e))
  }
}

export const setChannelStats = (channelHash: string) => {
  return (dispatch: any) => {
    axios
      .get(`/status/${channelHash}`)
      .then((response) => {
        // console.log("Channel Info: ", response.status, response.statusText)
        dispatch(assembleChannelStats(response.data))
      })
      .catch((e) => console.error(e))
  }
}
