import { BLOCK_ACTIVITY_DATA, ADD_NEW_BLOCK } from "../actionTypes"

import { ObjectType } from "../../utility/types"

// In TS an action must be of a strict format. Set them here:
type Action =
  | {
      type: typeof BLOCK_ACTIVITY_DATA
      payload: { blockActivityData: Array<ObjectType> }
    }
  | {
      type: typeof ADD_NEW_BLOCK
      payload: {
        previousBlockData: Array<ObjectType>
        newBlockData: ObjectType
      }
    }

const initialState = {
  channelHash: "",
  serverResponsive: true,
  availableChannels: Array<ObjectType>(),
  channelInfoData: {},
  blockActivityData: Array<ObjectType>(),
  txnActivityData: Array<ObjectType>(),
}

const blockReducer = (state = initialState, action: Action) => {
  // console.log(`Confirm Redux Action: `, action.type)
  switch (action.type) {
    case BLOCK_ACTIVITY_DATA:
      if (!action.payload) {
        return state
      }
      return {
        ...state,
        blockActivityData: action.payload.blockActivityData,
      }

    case ADD_NEW_BLOCK:
      if (!action.payload) {
        return state
      }
      const updatedBlockData = [...action.payload.previousBlockData]
      updatedBlockData.unshift(action.payload.newBlockData)

      return {
        ...state,
        blockActivityData: updatedBlockData.slice(0, 10), // Keep only 10 blocks in the table
      }
    default:
      return {
        ...state,
      }
  }
}

export default blockReducer
