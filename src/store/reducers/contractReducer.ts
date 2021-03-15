import { GET_ALL_CONTRACTS, GET_CONTRACT_TXNS } from "../actions/actionTypes"

import { ContractType, ObjectType } from "../../utility/types"

// In TS an action must be of a strict format. Set them here:
type Action =
  | {
      type: typeof GET_ALL_CONTRACTS
      payload: {
        contractData: Array<ContractType>
      }
    }
  | {
      type: typeof GET_CONTRACT_TXNS
      payload: {
        contractTxns: Array<ObjectType>
      }
    }

const initialState = {
  contractData: Array<ContractType>(),
  contractTxns: Array<ObjectType>(),
}

const contractReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_ALL_CONTRACTS:
      if (!action.payload) {
        return state
      }
      return {
        ...state,
        contractData: action.payload.contractData,
      }
    case GET_CONTRACT_TXNS:
      if (!action.payload) {
        return state
      }
      return {
        ...state,
        contractTxns: action.payload.contractTxns,
      }
    default:
      return {
        ...state,
      }
  }
}

export default contractReducer
