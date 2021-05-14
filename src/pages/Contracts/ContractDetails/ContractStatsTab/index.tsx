import { useState, useEffect } from "react"
import axios from "../../../../axios/axiosinst"

import TheGraph from "../../../MainPage/TheGraph"

import useChannelHash from "../../../../hooks/useChannelHash"

import { format } from "date-fns"
import { logger } from "../../../../utility/functions"

import style from "./ContractsStatsTab.module.css"

type Props = {
  contractName: string | undefined
}

function ContractStatsTab({ contractName }: Props) {
  const activeChannelHash = useChannelHash()

  const [graphData, setGraphData] = useState([])

  useEffect(() => {
    axios
      .get(
        `/chaincode/txByDay/${activeChannelHash}/${contractName}/${format(
          new Date(),
          "yyyy%2'F'MM%2'F'dd"
        )}}`
      )
      .then((response) => {
        logger("Chaincode Stats: ", "get", response)
        setGraphData(response.data.rows)
      })
  }, [activeChannelHash, contractName])

  return (
    <div className={style.block}>
      <TheGraph data={graphData} width={"95%"} minWidth={"50px"} height={500} />
    </div>
  )
}

export default ContractStatsTab
