import axios from "../../axios/axiosinst"

import { GET_ALL_CONTRACTS, GET_CONTRACT_TXNS } from "./actionTypes"

import { ContractType, ObjectType } from "../../utility/types"

//This function formats the action for the reducer to put into state
const assembleAllContracts = (data: Array<ContractType>) => {
  return { type: GET_ALL_CONTRACTS, payload: { contractData: data } }
}
const assembleContractTxns = (data: Array<ObjectType>) => {
  return { type: GET_CONTRACT_TXNS, payload: { contractTxns: data } }
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
export const getContractTxns = (channelHash: string, contractName: string) => {
  return (dispatch: any) => {
    axios
      .get(`/chaincode/${channelHash}?chaincode=${contractName}`)
      .then((response) => {
        const contractTxns = response.data.row
        dispatch(assembleContractTxns(contractTxns))
        // look at txnActions.ts to see how to add from, if needed
      })
  }
}
