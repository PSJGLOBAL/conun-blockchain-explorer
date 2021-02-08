import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Route } from "react-router-dom"

import {
  setBlockActivityData,
  setTxnActivityData,
  setChannelInfo,
  setChannelStats,
} from "../../../store/actions"

import WebSocketProvider from "../../WebSocketProvider/WebSocketProvider"
import { StatsBlock } from "../../../containers/StatsBlock/Statsblock"
import { BlockActivitySection } from "../../../containers/BlockActivitySection/BlockActivitySection"
import { TxnActivitySection } from "../../../containers/TxnActivitySection/TxnActivitySection"

import "./InterfaceMain.css"

import { State } from "../../../utility/types"

export const InterfaceMain = () => {
  const dispatch = useDispatch()

  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  // If the channel hash is loaded, get the rest of the data
  useEffect(() => {
    if (activeChannelHash && activeChannelHash !== "") {
      dispatch(setChannelInfo(activeChannel)) // Set Channel Info
      dispatch(setBlockActivityData(activeChannelHash.toString())) // Get Block Activity - Redux Action performs API call
      dispatch(setTxnActivityData(activeChannelHash.toString())) // Get Block Activity - Redux Action performs API call
      dispatch(setChannelStats(activeChannelHash.toString()))
    }
  }, [activeChannelHash, activeChannel, dispatch])

  return (
    <main>
      <StatsBlock />
      <div className="splitcolumns">
        <Route path="/" exact component={WebSocketProvider} />
        <Route path={["/", "/blocks"]} exact component={BlockActivitySection} />
        <Route path={["/", "/txns"]} exact component={TxnActivitySection} />
      </div>
    </main>
  )
}
