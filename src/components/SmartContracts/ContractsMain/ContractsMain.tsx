import { useSelector, useDispatch } from "react-redux"
import { getAllContracts } from "../../../store/actions"

import ContractsDataBlock from "../ContractsDataBlock/ContractsDataBlock"

import { State } from "../../../utility/types"

import "./ContractsMain.css"

const ContractsMain = () => {
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash
  const dispatch = useDispatch()
  dispatch(getAllContracts(activeChannelHash.toString()))

  return (
    <main className="contracts-main">
      <ContractsDataBlock />
    </main>
  )
}

export default ContractsMain
