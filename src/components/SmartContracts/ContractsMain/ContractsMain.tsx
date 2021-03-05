import { useSelector, useDispatch } from "react-redux"
import { getAllContracts } from "../../../store/actions"

import ContractSection from "../ContractSection/ContractSection"

import { State } from "../../../utility/types"

import "./ContractsMain.css"

const ContractsMain = () => {
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash
  const dispatch = useDispatch()
  dispatch(getAllContracts(activeChannelHash.toString()))

  return (
    <main className="contracts-main">
      <ContractSection />
    </main>
  )
}

export default ContractsMain
