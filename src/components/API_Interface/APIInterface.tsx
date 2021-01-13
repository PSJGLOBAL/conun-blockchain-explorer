import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "../../axios/axiosinst"
import { w3cwebsocket as W3CWebSocket } from "websocket"

import { InfoBlock } from "../InfoBlock/InfoBlock"

import "./APIInterface.css"

type State = {
  channelHash: string
}

interface IObjectKeys {
  [key: string]: string | number
}

export const APIInterface = () => {
  const channelHash = useSelector((state: State) => state.channelHash)

  const [channelInfoData, setChannelInfoData] = useState<IObjectKeys | null>()
  const [
    blockActivityData,
    setBlockActivityData,
  ] = useState<Array<IObjectKeys> | null>()
  const [
    socketActivity,
    setSocketActivity,
  ] = useState<Array<IObjectKeys> | null>()

  const blockSocket = new W3CWebSocket(
    `ws://192.168.100.105:8080/api/blockActivity/fdfd720dc97577884b7d9fc7a5a347da6e61f7a5f80f9f6a6be982764554a884` // Change hard code here to variable
  )

  const txnSocket = new W3CWebSocket(
    "ws://192.168.100.105:8080/api/txActivity/fdfd720dc97577884b7d9fc7a5a347da6e61f7a5f80f9f6a6be982764554a884"
  )

  useEffect(() => {
    if (channelHash !== "") {
      // Get Channel Info
      axios
        .get("/channels/info")
        .then((response) => {
          console.log("Channel Info: ", response.status, response.statusText)
          setChannelInfoData(response.data.channels[0])
        })
        .catch((e) => console.log(e))
      // Get Block Activity
      axios
        .get(`/blockActivity/${channelHash}`)
        .then((response) => {
          console.log("Block Activity: ", response.status, response.statusText)
          setBlockActivityData(response.data.row)
        })
        .catch((e) => console.log(e))
    }
  }, [channelHash])

  useEffect(() => {
    blockSocket.onopen = () => {
      console.log("WS: BLOCK: Successfully subscribed to Block Activity")
    }
    blockSocket.onmessage = (message) => {
      console.log("WS: BLOCK: Received data: ", message)
    }
  }, [blockSocket])

  useEffect(() => {
    txnSocket.onopen = () => {
      console.log("WS: TXN: Successfully subscribed to TXN Activity")
    }
    txnSocket.onmessage = (message) => {
      console.log("WS: TXN: Received data: ", message)
    }
  }, [txnSocket])

  return (
    <main>
      {/* Channel Info */}
      <section className="section">
        <div className="section-title">Channel Info</div>
        {channelInfoData ? (
          <InfoBlock data={{ ...channelInfoData }} />
        ) : (
          <div className="loading-block">Loading Data</div>
        )}
      </section>
      {/* Block Activity */}
      <section className="section">
        <div className="section-title">Block Activity</div>
        <div className="section-block-scrollable">
          {blockActivityData ? (
            blockActivityData.map((i) => (
              <InfoBlock key={i.blockhash} data={{ ...i }} />
            ))
          ) : (
            <div className="loading-block">Loading Data</div>
          )}
        </div>
      </section>
      {/* Transaction Activity */}
      <section className="section">
        <div className="section-title">Transaction Activity</div>
        <div className="section-block-scrollable"></div>
      </section>
    </main>
  )
}
