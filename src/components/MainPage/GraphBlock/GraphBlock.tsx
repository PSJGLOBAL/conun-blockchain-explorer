import { useState, useEffect, useCallback } from "react"
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

  const doGraphDataGet = useCallback(
    (graphMode: string) => {
      switch (graphMode) {
        case "txn-hour":
          axios.get(`/txByHour/${activeChannelHash}/1`).then((response) => {
            setGraphData(response.data.rows)
          })
          break
        case "txn-min":
          axios.get(`/txByMinute/${activeChannelHash}/1`).then((response) => {
            setGraphData(response.data.rows)
          })
          break
        case "block-hour":
          axios.get(`blocksByHour/${activeChannelHash}/1`).then((response) => {
            setGraphData(response.data.rows)
          })
          break
        case "block-min":
          axios
            .get(`/blocksByMinute/${activeChannelHash}/1`)
            .then((response) => {
              setGraphData(response.data.rows)
            })
          break
        default:
          console.error("GRAPHMODE: Error - Impossible mode selected (HOW?!?)")
      }
    },
    [activeChannelHash]
  )

  useEffect(() => {
    if (activeChannelHash && activeChannelHash !== "") {
      doGraphDataGet(graphMode)
    }
  }, [graphMode, activeChannelHash, doGraphDataGet])

  useEffect(() => {
    const graphTimer = setInterval(function () {
      // console.log("GRAPH: Scheduled Graph Update")
      doGraphDataGet(graphMode)
    }, 30000)

    return () => {
      clearTimeout(graphTimer)
    }
  }, [doGraphDataGet, graphMode])

  return (
    <div className="section-block">
      <TheGraph data={graphData} />
      <GraphControls clickHandler={setGraphMode} active={graphMode} />
    </div>
  )
}
