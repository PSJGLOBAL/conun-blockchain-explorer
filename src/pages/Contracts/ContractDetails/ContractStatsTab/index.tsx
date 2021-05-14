import TheGraph from "../../../MainPage/TheGraph"

import useChannelHash from "../../../../hooks/useChannelHash"
import useGraphData from "../../../../hooks/useGraphData"

import { format } from "date-fns"

import style from "./ContractsStatsTab.module.css"

type Props = {
  contractName: string | undefined
}

function ContractStatsTab({ contractName }: Props) {
  const activeChannelHash = useChannelHash()
  const url = `/chaincode/txByDay/${activeChannelHash}/${contractName}/${format(
    new Date(),
    "yyyy%2'F'MM%2'F'dd"
  )}}`

  const { graphData } = useGraphData(url)
  return (
    <div className={style.block}>
      {graphData && (
        <TheGraph
          data={graphData.slice(graphData.length - 24)}
          width={"95%"}
          minWidth={"50px"}
          height={500}
        />
      )}
    </div>
  )
}

export default ContractStatsTab
