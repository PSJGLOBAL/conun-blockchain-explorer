import {
  GET_AVAILABLE_CHANNELS,
  SET_CHANNEL_HASH,
  SET_SERVER_STATUS,
  SET_CHANNEL_INFO,
} from "../actionTypes"

import { ObjectType } from "../../utility/types"

// In TS an action must be of a strict format. Set them here:
type Action =
  | {
      type: typeof GET_AVAILABLE_CHANNELS
      payload: { availableChannels: Array<ObjectType> }
    }
  | {
      type: typeof SET_CHANNEL_HASH
      payload: { hash: string }
    }
  | {
      type: typeof SET_SERVER_STATUS
      payload: { responsive: boolean }
    }
  | {
      type: typeof SET_CHANNEL_INFO
      payload: { channelInfoData: ObjectType }
    }

const initialState = {
  channelHash: "",
  serverResponsive: true,
  availableChannels: Array<ObjectType>(),
  channelInfoData: {},
}

const basicReducer = (state = initialState, action: Action) => {
  console.log(`Confirm Redux Action: `, action.type)
  switch (action.type) {
    case GET_AVAILABLE_CHANNELS:
      if (!action.payload) {
        return state
      }

      return {
        ...state,
        availableChannels: action.payload.availableChannels,
      }

    case SET_CHANNEL_HASH:
      if (!action.payload) {
        return state
      }
      return { ...state, channelHash: action.payload.hash }

    case SET_SERVER_STATUS:
      if (!action.payload) {
        return state
      }

      return {
        ...state,
        serverResponsive: action.payload.responsive,
      }
    case SET_CHANNEL_INFO:
      if (!action.payload) {
        return state
      }
      return {
        ...state,
        channelInfoData: action.payload.channelInfoData,
      }

    default:
      return {
        ...state,
      }
  }
}

export default basicReducer
