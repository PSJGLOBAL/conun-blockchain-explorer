import { useSelector, useDispatch } from "react-redux"
import { Route, Switch } from "react-router-dom"

import { getAllContracts } from "../../../store/actions"

import ContractSection from "../ContractSection/ContractSection"
import ContractDetails from "../ContractDetails/ContractDetailPage/ContractDetails"

import { State } from "../../../utility/types"

import "./ContractsMain.css"

const ContractsMain = () => {
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash
  const dispatch = useDispatch()
  dispatch(getAllContracts(activeChannelHash.toString()))

  return (
    <main className="contracts-main">
      <Switch>
        <Route path="/contracts/:contractName">
          <ContractDetails />
        </Route>
        <Route path="/contracts" exact>
          <ContractSection />
        </Route>
      </Switch>
    </main>
  )
}

export default ContractsMain
