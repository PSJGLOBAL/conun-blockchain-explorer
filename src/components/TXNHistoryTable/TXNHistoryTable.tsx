import { useEffect, useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import { setChannelStats } from "../../store/actions"
import axios from "../../axios/axiosinst"

import { logger } from "../../utility/functions"
import { State, ObjectType } from "../../utility/types"

import TransactionTable from "../../components/TransactionTable/TransactionTable"

type Props = {
  param: string | undefined
  dataRole?: "contract" | "wallet"
}

const TXNHistoryTable = ({ param, dataRole }: Props) => {
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  const axiosURL =
    dataRole === "wallet"
      ? `/userActivity/${activeChannelHash}/${param}`
      : `/txActivity/${activeChannelHash}?chaincode=${param}`

  const [txnData, setTxnData] = useState<Array<ObjectType> | null>(null)

  const dispatch = useDispatch()

  logger("CONTRACT DETAILS: ", "get", txnData)

  useEffect(() => {
    dispatch(setChannelStats(activeChannelHash))
  }, [activeChannelHash, param, dispatch])

  // Use axios to get this data - so it is loaded each time a contract is clicked
  useEffect(() => {
    if (activeChannelHash && param) {
      axios.get(axiosURL).then((response) => {
        setTxnData(response.data.row)
      })
    }
  }, [activeChannelHash, param, axiosURL, dispatch])
  return <TransactionTable txnData={txnData} fullPage />
}

export default TXNHistoryTable
