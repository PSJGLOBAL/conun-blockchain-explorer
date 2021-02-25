import { GET_ALL_CONTRACTS } from "../actions/actionTypes"

import { ObjectType } from "../../utility/types"

// In TS an action must be of a strict format. Set them here:
type Action = {
  type: typeof GET_ALL_CONTRACTS
  payload: {
    contractData: Array<ObjectType>
  }
}

const initialState = {
  contractData: Array<ObjectType>(),
}

const contractReducer = (state = initialState, action: Action) => {
  console.log(`Confirm Redux Action: `, action.type)
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
