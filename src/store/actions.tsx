import axios from "../axios/axiosinst"

import { SET_CHANNEL_HASH, BLOCK_ACTIVITY_DATA } from "./actionTypes"

interface IObjectKeys {
  [key: string]: string | number
}

export const setChannelHash = (hash: string) => {
  return { type: SET_CHANNEL_HASH, payload: { hash: hash } }
}

// data:Array<IObjectKeys>

const assembleBlockDataObj = (data: Array<IObjectKeys>) => {
  return { type: BLOCK_ACTIVITY_DATA, payload: { blockActivityData: data } }
}

export const setBlockActivityData = (channelHash: string) => {
  return (dispatch: any) => {
    axios
      .get(`/blockActivity/${channelHash}`)
      .then((response) => {
        console.log("Block Activity: ", response.status, response.statusText)
        dispatch(assembleBlockDataObj(response.data.row))
      })
      .catch((e) => console.error(e))
  }
}
