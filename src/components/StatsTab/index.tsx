import TheGraph from "../../pages/MainPage/TheGraph"

import useChannelHash from "../../hooks/useChannelHash"
import useGraphData from "../../hooks/useGraphData"

import style from "./StatsTab.module.css"

type Props = {
  role: "contract" | "wallet"
  searchParam: string | undefined
}

function StatsTab({ role, searchParam }: Props) {
  const activeChannelHash = useChannelHash()

  const prefix = role === "contract" ? "chaincode" : "user"

  const url = `/${prefix}/txByDay/${activeChannelHash}/${searchParam}/30`

  const { graphData } = useGraphData(url, "byDay")
  return (
    <div>
      <div className={style.Title}>
        Total transactions per day for the last 30 days
      </div>
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
