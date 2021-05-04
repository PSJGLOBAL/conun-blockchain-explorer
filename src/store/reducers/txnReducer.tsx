import { TXN_ACTIVITY_DATA, ADD_NEW_TXNS } from "../actions/actionTypes"
import { logger } from "../../utility/functions"
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
  switch (action.type) {
    case TXN_ACTIVITY_DATA:
      if (!action.payload) {
        return state
      }
      logger("TXN REDUCER: ", "info", action.payload.txnActivityData)
      return {
        ...state,
        txnActivityData: action.payload.txnActivityData,
        from: action.payload.from || null,
      }

    case ADD_NEW_TXNS:
      // Ignore a blank payload
      if (!action.payload) {
        return state
      }

      const updatedTxnData = [...action.payload.previousTxnData] // Save existing txns
      let txnsToAdd: Array<ObjectType>

      if (action.payload.newTxnsArray.length > 10) {
        logger(
          "TXN REDUCER: Incoming array has too many txns.",
          "warn",
          action.payload.newTxnsArray
        )
        txnsToAdd = action.payload.newTxnsArray.slice(0, 10)
        return {
          ...state,
          txnActivityData: txnsToAdd, //maintain only 10 blocks on this page
        }
      } else {
        if (action.payload.newTxnsArray.length < 10) {
          logger(
            "TXN REDUCER: Incoming array has too few txns. ",
            "warn",
            action.payload.newTxnsArray
          )
        }
        txnsToAdd = action.payload.newTxnsArray
        updatedTxnData.unshift(...txnsToAdd)
        logger("TXN REDUCER: Combined txns are: ", "info", updatedTxnData)
        return {
          ...state,
          // txnActivityData: updatedTxnData.slice(0, 10), //maintain only 10 blocks on this page
          txnActivityData: updatedTxnData,
        }
      }

    default:
      return {
        ...state,
      }
  }
}

export default txnReducer
