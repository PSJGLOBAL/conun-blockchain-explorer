import { SET_CHANNEL_HASH, BLOCK_ACTIVITY_DATA } from "../actionTypes"

interface IObjectKeys {
  [key: string]: string | number
}

// In TS an action must be of a strict format. Set them here:
type Action =
  | {
      type: "SET_CHANNEL_HASH"
      payload: { hash: string }
    }
  | {
      type: "BLOCK_ACTIVITY_DATA"
      payload: { blockActivityData: Array<IObjectKeys> }
    }

const initialState = {
  channelHash: "",
  blockActivityData: Array<IObjectKeys>(),
}

const hashReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_CHANNEL_HASH:
      if (!action.payload) {
        return state
      }

      return {
        ...state,
        channelHash: action.payload.hash,
      }

    case BLOCK_ACTIVITY_DATA:
      if (!action.payload) {
        return state
      }
      return {
        ...state,
        blockActivityData: action.payload.blockActivityData,
      }

    default:
      return {
        ...state,
      }
  }
}

export default hashReducer
