import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { w3cwebsocket as W3CWebsocket } from "websocket"

import { State } from "../../utility/types"
import * as actions from "../../store/actions"

function WebSocketProvider() {
  const [socket, setSocket] = useState<null | W3CWebsocket>(null)
  const dispatch = useDispatch()
  // const activeChannelHash = useSelector((state: State) => state.basic.activeChannelHash)
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash
  const blockActivityData = useSelector(
    (state: State) => state.block.blockActivityData
  )
  const txnActivityData = useSelector(
    (state: State) => state.txn.txnActivityData
  )

  useEffect(() => {
    if (socket === null && activeChannelHash !== "") {
      console.log("Websocket: Initialising...")
      const newSocket = new W3CWebsocket(
        `ws://192.168.100.105:8081/api/blockActivity/${activeChannelHash}`
      )
      setSocket(newSocket)
    }
  }, [activeChannelHash, socket])

  if (socket) {
    socket.onopen = () => {
      console.log("Websocket: Connected")
    }
    socket.onmessage = (msg) => {
      console.warn(msg)
      const socketData = JSON.parse(msg.data.toString())
      console.log("Websocket: Message received: ", socketData)

      const { txdata, notify_type, ...socketBlocks } = socketData
      console.log("Websocket: ", txdata)
      const socketTxns = txdata
      dispatch(actions.addNewBlock(blockActivityData, socketBlocks))
      dispatch(actions.addNewTxns(txnActivityData, socketTxns))
    }
  }

  return null
}

export default WebSocketProvider
