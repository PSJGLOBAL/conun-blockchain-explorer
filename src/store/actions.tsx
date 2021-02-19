import axios from "../axios/axiosinst"

import {
  GET_AVAILABLE_CHANNELS,
  SET_CHANNEL_HASH,
  SET_SERVER_STATUS,
  SET_CHANNEL_INFO,
  SET_CHANNEL_STATS,
  BLOCK_ACTIVITY_DATA,
  TXN_ACTIVITY_DATA,
  ADD_NEW_BLOCK,
  ADD_NEW_TXNS,
  SET_ACTIVE_CHANNEL,
} from "./actionTypes"

//Type for object
import { ObjectType, ChannelObject } from "../utility/types"

export const assembleAvailableChannels = (data: Array<ObjectType>) => {
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
export const assembleChannelStats = (data: ObjectType) => {
  return { type: SET_CHANNEL_STATS, payload: { channelStats: data } }
}

const assembleBlockDataObj = (data: Array<ObjectType>) => {
  return { type: BLOCK_ACTIVITY_DATA, payload: { blockActivityData: data } }
}
const assembleTxnDataObj = (data: Array<ObjectType>) => {
  return { type: TXN_ACTIVITY_DATA, payload: { txnActivityData: data } }
}

export const addNewBlock = (
  previousBlockData: Array<ObjectType>,
  newBlockObj: ObjectType
) => {
  return {
    type: ADD_NEW_BLOCK,
    payload: {
      previousBlockData: previousBlockData,
      newBlockData: newBlockObj,
    },
  }
}
export const addNewTxns = (
  previousTxnData: Array<ObjectType>,
  newTxnsArray: Array<ObjectType>
) => {
  return {
    type: ADD_NEW_TXNS,
    payload: { previousTxnData: previousTxnData, newTxnsArray: newTxnsArray },
  }
}

export const getAvailableChannels = () => {
  return (dispatch: any) => {
    axios
      .get("/channels/info")
      .then((response) => {
        console.log(
          "Available Channels: ",
          response.status,
          response.statusText
        )
        console.log("Available Channels: ", response.data.channels)
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
        console.log("Channel Info: ", response.status, response.statusText)
        dispatch(assembleChannelStats(response.data))
      })
      .catch((e) => console.error(e))
  }
}

// Redux Action to get block activity data
export const setBlockActivityData = (
  channelHash: string,
  from: number | string | null = null
) => {
  return (dispatch: any) => {
    let axiosAddress = `/blockActivity/${channelHash}`
    if (from) {
      console.log("Block Activity: Using Blocknum: ", from)
      axiosAddress += `?blocknum=${from}`
    }

    axios
      .get(axiosAddress)
      .then((response) => {
        console.log("Block Activity: ", response.status, response.statusText)
        dispatch(assembleBlockDataObj(response.data.row))
      })
      .catch((e) => console.error(e))
  }
}

// Redux Action to get transaction activity data
export const setTxnActivityData = (
  channelHash: string,
  from: number | string | null = null
) => {
  return (dispatch: any) => {
    let axiosAddress = `/txActivity/${channelHash}`
    if (from) {
      console.log("Transaction Activity: Using TX ID: ", from)
      axiosAddress += `?txId${from}`
    }

    axios
      .get(axiosAddress)
      .then((response) => {
        console.log(
          "Transaction Activity: ",
          response.status,
          response.statusText
        )
        dispatch(assembleTxnDataObj(response.data.row))
      })
      .catch((e) => console.error(e))
  }
}
