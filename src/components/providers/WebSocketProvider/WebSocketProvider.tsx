import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { w3cwebsocket as W3CWebsocket } from "websocket"

import { useHistory } from "react-router-dom"

import { State } from "../../../utility/types"
import { logger } from "../../../utility/functions"
import * as actions from "../../../store/actions"
import { SOCKETURL } from "../../../utility/config.json"

function WebSocketProvider() {
  const [socket, setSocket] = useState<null | W3CWebsocket>(null)
  const dispatch = useDispatch()
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash
  const blockActivityData = useSelector(
    (state: State) => state.block.blockActivityData
  )
  const txnActivityData = useSelector(
    (state: State) => state.txn.txnActivityData
  )

  let history = useHistory()

  useEffect(() => {
    if (socket === null && activeChannelHash && activeChannelHash !== "") {
      logger("Websocket: Initialising...", "info")
      const newSocket = new W3CWebsocket(
        `${SOCKETURL}/blockActivity/${activeChannelHash}`
      )
      setSocket(newSocket)
    }
  }, [activeChannelHash, socket])

  if (socket) {
    socket.onopen = () => {
      logger("Websocket: Connected", "success")
    }
    socket.onmessage = (msg) => {
      const socketData = JSON.parse(msg.data.toString())

      const { txdata, notify_type, ...socketBlocks } = socketData
      const socketTxns = txdata

      // Mute the websocket if the user is not on the front page
      if (history.location.pathname === "/") {
        dispatch(actions.addNewBlock(blockActivityData, socketBlocks))
        dispatch(actions.addNewTxns(txnActivityData, socketTxns))
        //If websocket message comes in, trigger channel stats to update
        if (activeChannelHash && activeChannelHash !== "") {
          dispatch(actions.setChannelStats(activeChannelHash.toString()))
        }
      }
    }
  }

  return null
}

export default WebSocketProvider
