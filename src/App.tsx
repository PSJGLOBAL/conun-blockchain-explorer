import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "./axios/axiosinst"
import { w3cwebsocket as W3CWebsocket } from "websocket"

import * as actions from "./store/actions"

import Header from "./ui/Header/Header"
import SelectChannel from "./components/SelectChannel/SelectChannel"
import { APIInterface } from "./components/API_Interface/APIInterface"

interface IObjectKeys {
  [key: string]: string | number
}

type State = {
  availableChannels: Array<IObjectKeys>
  channelHash: string
  serverResponsive: boolean
  channelInfoData: IObjectKeys
  blockActivityData: Array<IObjectKeys>
  txnActivityData: Array<IObjectKeys>
}

function App() {
  const dispatch = useDispatch()
  const channelHash = useSelector((state: State) => state.channelHash)
  const serverResponse = useSelector((state: State) => state.serverResponsive)
  const blockActivityData = useSelector(
    (state: State) => state.blockActivityData
  )
  const txnActivityData = useSelector((state: State) => state.txnActivityData)
  const [socket, setSocket] = useState<null | W3CWebsocket>(null)

  useEffect(() => {
    axios.get("/curChannel").then((response) => {
      console.log(
        "Received channel hash: ",
        response.status,
        response.statusText
      )
      if (response.status === 200) {
        dispatch(actions.setChannelHash(response.data.currentChannel))
      } else {
        dispatch(actions.setServerStatus(false))
      }
    })
  }, [dispatch])

  useEffect(() => {
    if (socket === null && channelHash !== "") {
      console.log("Websocket: Initialising...")
      const newSocket = new W3CWebsocket(
        `ws://192.168.100.105:8080/api/blockActivity/${channelHash}`
      )
      setSocket(newSocket)
    }
  }, [channelHash, socket])

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
          ? channelHash !== ""
            ? channelHash
            : "Loading"
          : "Server Unresponsive"}
      </div>
      <APIInterface />
    </div>
  )
}
export default App
