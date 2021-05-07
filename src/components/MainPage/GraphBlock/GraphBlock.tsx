import { useState, useEffect, useCallback } from "react"

import GraphSkeleton from "../../../ui/Skeletos/GraphSkeleton/GraphSkeleton"
import GraphControls from "../GraphControls/GraphControls"
import TheGraph from "../TheGraph/TheGraph"

import useChannelHash from "../../../hooks/useChannelHash"

import axios from "../../../axios/axiosinst"

import { ObjectType } from "../../../utility/types"
import { logger } from "../../../utility/functions"

const GraphBlock = () => {
  const activeChannelHash = useChannelHash()

  const [graphMode, setGraphMode] = useState<string>("txn-min")
  const [graphData, setGraphData] = useState<Array<ObjectType>>([])

  const doGraphDataGet = useCallback(
    (graphMode: string) => {
      let axiosUrlSegment: string | false = false
      let badGraphMode = false

      switch (graphMode) {
        case "txn-hour":
          axiosUrlSegment = "txByHour"
          break
        case "txn-min":
          axiosUrlSegment = "txByMinute"
          break
        case "block-hour":
          axiosUrlSegment = "blocksByHour"
          break
        case "block-min":
          axiosUrlSegment = "blocksByMinute"
          break
        default:
          badGraphMode = true
          logger(
            "GRAPH: Graph mode Error - Impossible mode selected (HOW?!?)",
            "error"
          )
      }

      if (!badGraphMode && axiosUrlSegment) {
        axios
          .get(`/${axiosUrlSegment}/${activeChannelHash}/1`)
          .then((response) => {
            logger("GRAPH: Response: ", "get", response)
            setGraphData(response.data.rows)
          })
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
      logger("GRAPH: Scheduled Update", "info")
      doGraphDataGet(graphMode)
    }, 30000)

    return () => {
      clearTimeout(graphTimer)
    }
  }, [doGraphDataGet, graphMode])

  return (
    <div className="section-block graph-block">
      {graphData.length > 0 ? (
        <>
          <TheGraph data={graphData} />
          <GraphControls clickHandler={setGraphMode} active={graphMode} />
        </>
      ) : (
        <>
          <GraphSkeleton />
        </>
      )}
    </div>
  )
}

export default GraphBlock
