import { useState, useEffect } from "react"

import { format } from "date-fns"
import axios from "../axios/axiosinst"
import { logger } from "../utility/functions"
import { ObjectType } from "../utility/types"

function useGraphData(sourceURL: string, dateFormat: string) {
  const [graphData, setGraphData] = useState<Array<ObjectType> | null>(null)

  let formatString: string
  switch (dateFormat) {
    case "Yearly":
      formatString = "yyyy"
      break
    case "Monthly":
      formatString = "yyyy/MM"
      break
    case "Weekly":
      formatString = "MM/dd"
      break
    case "Daily":
    default:
      formatString = "kk:mm"
      break
  }

  useEffect(() => {
    axios.get(sourceURL).then((response) => {
      logger("Graph Data GET: ", "get", response)
      setGraphData(
        response.data.rows.map((i: any) => {
          return {
            ...i,
            count: Number(i.count),
            datetime: format(new Date(i.datetime.toString()), formatString),
          }
        })
      )
    })
  }, [sourceURL, formatString])

  return { graphData }
}

export default useGraphData
