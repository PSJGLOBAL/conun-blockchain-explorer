import { useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import { setChannelStats } from "../../../../store/actions"
import axios from "../../../../axios/axiosinst"

import { logger } from "../../../../utility/functions"
import { ObjectType } from "../../../../utility/types"

import TransactionTable from "../../../../components/TransactionTable/TransactionTable"
import useChannelHash from "../../../../hooks/useChannelHash"

type Props = {
  contractName: string | undefined
}

const ContractHistoryTable = ({ contractName }: Props) => {
  const activeChannelHash = useChannelHash()

  const [
    contractTxnData,
    setContractTxnData,
  ] = useState<Array<ObjectType> | null>(null)

  const dispatch = useDispatch()

  logger("CONTRACT DETAILS: ", "get", contractTxnData)

  useEffect(() => {
    dispatch(setChannelStats(activeChannelHash))
  }, [activeChannelHash, contractName, dispatch])

  // Use axios to get this data - so it is loaded each time a contract is clicked
  useEffect(() => {
    if (activeChannelHash && contractName) {
      axios
        .get(`/txActivity/${activeChannelHash}?chaincode=${contractName}`)
        .then((response) => {
          setContractTxnData(response.data.row)
        })
    }
  }, [activeChannelHash, contractName, dispatch])
  return <TransactionTable txnData={contractTxnData} fullPage />
}

export default ContractHistoryTable
