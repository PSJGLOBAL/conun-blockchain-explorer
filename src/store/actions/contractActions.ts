import axios from "../../axios/axiosinst"

import { GET_ALL_CONTRACTS } from "./actionTypes"

import { ContractType } from "../../utility/types"

//This function formats the action for the reducer to put into state
const assembleAllContracts = (data: Array<ContractType>) => {
  return { type: GET_ALL_CONTRACTS, payload: { contractData: data } }
}

// Here, hash is an argument given when this action is called.
//It is called with this function, since it has extra processes to do first.
export const getAllContracts = (channelHash: string) => {
  return (dispatch: any) => {
    axios.get(`/chaincode/${channelHash}`).then((response) => {
      const contracts = response.data.chaincode
      dispatch(assembleAllContracts(contracts))
    })
  }
}
