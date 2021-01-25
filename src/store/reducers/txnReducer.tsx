import { TXN_ACTIVITY_DATA, ADD_NEW_TXNS } from "../actionTypes"

import { ObjectType } from "../../utility/types"

// In TS an action must be of a strict format. Set them here:
type Action =
  | {
      type: "TXN_ACTIVITY_DATA"
      payload: { txnActivityData: Array<ObjectType> }
    }
  | {
      type: "ADD_NEW_TXNS"
      payload: {
        previousTxnData: Array<ObjectType>
        newTxnsArray: Array<ObjectType>
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

const txnReducer = (state = initialState, action: Action) => {
  // console.log(`Confirm Redux Action: `, action.type)
  switch (action.type) {
    case TXN_ACTIVITY_DATA:
      if (!action.payload) {
        return state
      }
      return {
        ...state,
        txnActivityData: action.payload.txnActivityData,
      }

    case ADD_NEW_TXNS:
      if (!action.payload) {
        return state
      }
      const updatedTxnData = [...action.payload.previousTxnData]
      updatedTxnData.unshift(...action.payload.newTxnsArray)

      return {
        ...state,
        txnActivityData: updatedTxnData,
      }

    default:
      return {
        ...state,
      }
  }
}

export default txnReducer
