import { GET_ALL_CONTRACTS } from "../actions/actionTypes"

import { ContractType } from "../../utility/types"

// In TS an action must be of a strict format. Set them here:
type Action = {
  type: typeof GET_ALL_CONTRACTS
  payload: {
    contractData: Array<ContractType>
  }
}

const initialState = {
  contractData: Array<ContractType>(),
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
    default:
      return {
        ...state,
      }
  }
}

export default contractReducer
