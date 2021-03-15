import { useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { getContractTxns, setChannelStats } from "../../../../store/actions"
import { logger } from "../../../../utility/functions"
import { State } from "../../../../utility/types"

import { TransactionTable } from "../../../../components/TransactionTable/TransactionTable"

type Props = {
  contractName: string | undefined
}

const ContractHistoryTable = ({ contractName }: Props) => {
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash
  const contractTxnData = useSelector((state: State) => state.ctx.contractTxns)

  const dispatch = useDispatch()

  logger("CONTRACT DETAILS: ", "get", contractTxnData)

  useEffect(() => {
    if (activeChannelHash && contractName) {
      dispatch(setChannelStats(activeChannelHash))
      dispatch(getContractTxns(activeChannelHash, contractName))
    }
  }, [activeChannelHash, contractName, dispatch])
  return <TransactionTable txnData={contractTxnData} fullPage={true} />
}

export default ContractHistoryTable
