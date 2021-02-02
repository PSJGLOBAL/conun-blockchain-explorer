import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import axios from "../../../axios/axiosinst"

import { GraphControls } from "../GraphControls/GraphControls"
import { TheGraph } from "../TheGraph/TheGraph"

import { State, ObjectType } from "../../../utility/types"

export const GraphBlock = () => {
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  const [graphMode, setGraphMode] = useState<string>("txn-min")
  const [graphData, setGraphData] = useState<Array<ObjectType>>([])

  useEffect(() => {
    if (graphMode === "txn-min") {
      axios.get(`/txByMinute/{${activeChannelHash}}/1`).then((response) => {
        setGraphData(response.data.rows)
      })
    }
  }, [activeChannelHash, graphMode])

  return (
    <div className="section-block">
      <TheGraph data={graphData} />
      <GraphControls />
    </div>
  )
}
