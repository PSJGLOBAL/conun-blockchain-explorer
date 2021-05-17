import { useState } from "react"

import TheGraph from "../../pages/MainPage/TheGraph"

import useChannelHash from "../../hooks/useChannelHash"
import useGraphData from "../../hooks/useGraphData"

import style from "./StatsTab.module.css"
import { GraphConfig } from "../../utility/types"

type Props = {
  role: "contract" | "wallet"
  title: string
  searchParam: string | undefined
}

function StatsTab({ role, title, searchParam }: Props) {
  const activeChannelHash = useChannelHash()
  const [graphDuration] = useState<GraphConfig>("weekly")

  const prefix = role === "contract" ? "chaincode" : "user"

  const url = `/${prefix}/txByDay/${activeChannelHash}/${searchParam}/6`

  const { graphData } = useGraphData(url, graphDuration)
  return (
    <div>
      <div className={style.Title}>{title}</div>
      <div className={style.Graph}>
        {graphData && (
          <TheGraph
            data={graphData.slice(graphData.length - 24)}
            width={"95%"}
            minWidth={"50px"}
            height={500}
          />
        )}
      </div>
    </div>
  )
}

export default StatsTab
