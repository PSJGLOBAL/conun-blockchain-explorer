import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { w3cwebsocket as W3CWebsocket } from "websocket"

import * as actions from "./store/actions"

import Header from "./ui/Header/Header"
import SelectChannel from "./components/SelectChannel/SelectChannel"
import { APIInterface } from "./components/API_Interface/APIInterface"

import { State } from "./utility/types"

function App() {
  const dispatch = useDispatch()
  // const activeChannelHash = useSelector((state: State) => state.basic.activeChannelHash)
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const serverResponse = useSelector(
    (state: State) => state.basic.serverResponsive
  )
  const blockActivityData = useSelector(
    (state: State) => state.block.blockActivityData
  )
  const txnActivityData = useSelector(
    (state: State) => state.txn.txnActivityData
  )
  const [socket, setSocket] = useState<null | W3CWebsocket>(null)

  const activeChannelHash = activeChannel.channel_genesis_hash

  // Check if active channel was updated (via ChannelProvider)
  useEffect(() => {
    console.log("APP: ActiveChannel: ", activeChannel)
  }, [activeChannel])

  useEffect(() => {
    if (socket === null && activeChannelHash !== "") {
      console.log("Websocket: Initialising...")
      const newSocket = new W3CWebsocket(
        `ws://192.168.100.105:8080/api/blockActivity/${activeChannelHash}`
      )
      setSocket(newSocket)
    }
  }, [activeChannelHash, socket])

  if (socket) {
    socket.onopen = () => {
      console.log("Websocket: Connected")
    }
    socket.onmessage = (msg) => {
      const socketData = JSON.parse(msg.data.toString())
      console.log("Websocket: Message received: ", socketData)
      const { txdata, notify_type, ...socketBlocks } = socketData
      const socketTxns = txdata
      dispatch(actions.addNewBlock(blockActivityData, socketBlocks))
      dispatch(actions.addNewTxns(txnActivityData, socketTxns))
    }
  }

  return (
    <div className="app">
      <Header />
      <SelectChannel />
      <div style={{ textAlign: "center" }}>
        {serverResponse
          ? activeChannelHash !== ""
            ? activeChannelHash
            : "Loading"
          : "Server Unresponsive"}
      </div>
      <APIInterface />
    </div>
  )
}
export default App
