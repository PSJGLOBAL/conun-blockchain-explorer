import { useState } from "react"

import TheGraph from "../../pages/MainPage/TheGraph"

import useChannelHash from "../../hooks/useChannelHash"
import useGraphData from "../../hooks/useGraphData"

import style from "./StatsTab.module.css"
import TabMenu from "../TabMenu"

type Props = {
  role: "contract" | "wallet"
  searchParam: string | undefined
}

function StatsTab({ role, searchParam }: Props) {
  const activeChannelHash = useChannelHash()
  const [graphDuration, setGraphDuration] = useState<string>("Weekly")

  const prefix = role === "contract" ? "chaincode" : "user"
  let duration: string
  let timeParam: string
  let title: string

  switch (graphDuration) {
    case "Yearly":
      duration = "txByYear"
      timeParam = "3"
      title = "Total transactions per year for the last 3 years "
      break
    case "Monthly":
      duration = "txByMonth"
      timeParam = "5"
      title = "Total transactions per month for the last 6 months"
      break
    case "Weekly":
    default:
      duration = "txByDay"
      timeParam = "6"
      title = "Total transactions per day for the last week"
  }

  const url = `/${prefix}/${duration}/${activeChannelHash}/${searchParam}/${timeParam}`

  const { graphData } = useGraphData(url, graphDuration)
  return (
    <div>
      <div className={style.Title}>{title}</div>
      <TabMenu
        tabs={["Weekly", "Monthly"]}
        activeTab={graphDuration}
        doChangeTab={setGraphDuration}
      />
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
