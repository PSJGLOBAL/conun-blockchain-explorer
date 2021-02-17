import { Route } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import {
  setBlockActivityData,
  setTxnActivityData,
} from "../../../store/actions"
import { State } from "../../../utility/types"

import { StatsBlock } from "../../../containers/StatsBlock/Statsblock"
import { BlockActivitySection } from "../../../containers/BlockActivitySection/BlockActivitySection"
import { TxnActivitySection } from "../../../containers/TxnActivitySection/TxnActivitySection"

import "./InterfaceMain.css"

export const InterfaceMain = () => {
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  const dispatch = useDispatch()

  return (
    <main>
      <StatsBlock />
      <div className="splitcolumns">
        <Route
          path={"/"}
          exact
          render={() => {
            if (activeChannelHash && activeChannelHash !== "") {
              dispatch(setBlockActivityData(activeChannelHash.toString())) // Get Block Activity - Redux Action performs API call
              dispatch(setTxnActivityData(activeChannelHash.toString())) // Get Block Activity - Redux Action performs API call
            }
            return (
              <>
                <BlockActivitySection />
                <TxnActivitySection />
              </>
            )
          }}
        />
        <Route path={"/blocks"} exact component={BlockActivitySection} />
        <Route path={"/txns"} exact component={TxnActivitySection} />
      </div>
    </main>
  )
}
