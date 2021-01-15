import {
  SET_CHANNEL_HASH,
  SET_CHANNEL_INFO,
  BLOCK_ACTIVITY_DATA,
  TXN_ACTIVITY_DATA,
} from "../actionTypes"

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
  | {
      type: "TXN_ACTIVITY_DATA"
      payload: { txnActivityData: Array<IObjectKeys> }
    }
  | {
      type: "SET_CHANNEL_INFO"
      payload: { channelInfoData: IObjectKeys }
    }

const initialState = {
  channelHash: "",
  channelInfoData: {},
  blockActivityData: Array<IObjectKeys>(),
  txnActivityData: Array<IObjectKeys>(),
}

const mainReducer = (state = initialState, action: Action) => {
  console.log(`Confirm Redux Action: `, action.type)
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
    case TXN_ACTIVITY_DATA:
      if (!action.payload) {
        return state
      }
      return {
        ...state,
        txnActivityData: action.payload.txnActivityData,
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

export default mainReducer
