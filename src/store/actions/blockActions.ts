import axios from "../../axios/axiosinst"

import { BLOCK_ACTIVITY_DATA, ADD_NEW_BLOCK } from "./actionTypes"

import { ObjectType } from "../../utility/types"

const assembleBlockDataObj = (data: Array<ObjectType>) => {
  return { type: BLOCK_ACTIVITY_DATA, payload: { blockActivityData: data } }
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

// Redux Action to get block activity data
export const setBlockActivityData = (
  channelHash: string,
  from: number | string | null = null
) => {
  return (dispatch: any) => {
    let axiosAddress = `/blockActivity/${channelHash}`
    if (from) {
      // console.log("Block Activity: Using Blocknum: ", from)
      axiosAddress += `?blocknum=${from}`
    }

    axios
      .get(axiosAddress)
      .then((response) => {
        // console.log("Block Activity: ", response.status, response.statusText)
        dispatch(assembleBlockDataObj(response.data.row))
      })
      .catch((e) => console.error(e))
  }
}
