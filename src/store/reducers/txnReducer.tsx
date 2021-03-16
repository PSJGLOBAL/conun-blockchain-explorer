import { TXN_ACTIVITY_DATA, ADD_NEW_TXNS } from "../actions/actionTypes"

import { ObjectType } from "../../utility/types"

// In TS an action must be of a strict format. Set them here:
type Action =
  | {
      type: typeof TXN_ACTIVITY_DATA
      payload: {
        txnActivityData: Array<ObjectType>
        from?: number | string | null
      }
    }
  | {
      type: typeof ADD_NEW_TXNS
      payload: {
        previousTxnData: Array<ObjectType>
        newTxnsArray: Array<ObjectType>
      }
    }

const initialState = {
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
        from: action.payload.from || null,
      }

    case ADD_NEW_TXNS:
      if (!action.payload) {
        return state
      }
      const updatedTxnData = [...action.payload.previousTxnData]
      let txnsToAdd: Array<ObjectType>
      if (action.payload.newTxnsArray.length > 10) {
        txnsToAdd = action.payload.newTxnsArray.slice(0, 10)
        return {
          ...state,
          txnActivityData: txnsToAdd, //maintain only 10 blocks on this page
        }
      } else {
        txnsToAdd = action.payload.newTxnsArray
        updatedTxnData.unshift(...txnsToAdd)
        return {
          ...state,
          txnActivityData: updatedTxnData.slice(0, 10), //maintain only 10 blocks on this page
        }
      }

    default:
      return {
        ...state,
      }
  }
}

export default txnReducer
