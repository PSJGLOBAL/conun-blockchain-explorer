import axios from "../../axios/axiosinst"

import { TXN_ACTIVITY_DATA, ADD_NEW_TXNS } from "./actionTypes"

import { ObjectType } from "../../utility/types"

const assembleTxnDataObj = (data: Array<ObjectType>) => {
  return { type: TXN_ACTIVITY_DATA, payload: { txnActivityData: data } }
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

// Redux Action to get transaction activity data
export const setTxnActivityData = (
  channelHash: string,
  from: number | string | null = null
) => {
  return (dispatch: any) => {
    let axiosAddress = `/txActivity/${channelHash}`
    if (from) {
      axiosAddress += `?txId=${from}`
    }

    axios
      .get(axiosAddress)
      .then((response) => {
        dispatch(assembleTxnDataObj(response.data.row))
      })
      .catch((e) => console.error(e))
  }
}
