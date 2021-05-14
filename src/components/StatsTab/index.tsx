import TheGraph from "../../pages/MainPage/TheGraph"

import useChannelHash from "../../hooks/useChannelHash"
import useGraphData from "../../hooks/useGraphData"

import { format } from "date-fns"

import style from "./StatsTab.module.css"

type Props = {
  role: "contract" | "wallet"
  title: string
  searchParam: string | undefined
}

function StatsTab({ role, title, searchParam }: Props) {
  const activeChannelHash = useChannelHash()

  const prefix = role === "contract" ? "chaincode" : "user"

  const url = `/${prefix}/txByDay/${activeChannelHash}/${searchParam}/${format(
    new Date(),
    "yyyy%2'F'MM%2'F'dd"
  )}`

  const { graphData } = useGraphData(url)
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
