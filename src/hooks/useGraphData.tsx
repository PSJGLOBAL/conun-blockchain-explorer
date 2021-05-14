import { useState, useEffect } from "react"

import { format } from "date-fns"
import axios from "../axios/axiosinst"
import { logger } from "../utility/functions"
import { ObjectType } from "../utility/types"

function useGraphData(sourceURL: string) {
  const [graphData, setGraphData] = useState<Array<ObjectType> | null>(null)

  useEffect(() => {
    axios.get(sourceURL).then((response) => {
      logger("Graph Data GET: ", "get", response)
      setGraphData(
        response.data.rows.map((i: any) => {
          return {
            ...i,
            count: Number(i.count),
            datetime: format(new Date(i.datetime.toString()), "kk:mm"),
          }
        })
      )
    })
  }, [sourceURL])

  return { graphData }
}

export default useGraphData
