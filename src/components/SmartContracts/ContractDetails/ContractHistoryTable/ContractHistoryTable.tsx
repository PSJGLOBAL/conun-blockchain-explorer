import { useEffect, useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import { setChannelStats } from "../../../../store/actions"
import axios from "../../../../axios/axiosinst"

import { logger } from "../../../../utility/functions"
import { State, ObjectType } from "../../../../utility/types"

import { TransactionTable } from "../../../../components/TransactionTable/TransactionTable"

type Props = {
  contractName: string | undefined
}

const ContractHistoryTable = ({ contractName }: Props) => {
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

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
  return <TransactionTable txnData={contractTxnData} fullPage={true} />
}

export default ContractHistoryTable
