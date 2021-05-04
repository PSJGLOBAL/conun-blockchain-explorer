import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  ContractDetailTableSkeleton,
  ContractTextSkeleton,
} from "../../../../ui/Skeletos/ContractSkeleton/ContractSkeleton"

import ContractDetailTable from "../ContractDetailTable/ContractDetailTable"
import ContractTabbedSection from "../ContractTabbedSection/ContractTabbedSection"
import ContractTextBlock from "../ContractTextBlock/ContractTextBlock"

import style from "./ContractDetails.module.css"

import { State, ContractType } from "../../../../utility/types"
import { logger } from "../../../../utility/functions"

import { getContractType } from "../../../../utility/functions"

const ContractDetails = () => {
  const { contractName } = useParams<Record<string, string | undefined>>()
  const contracts = useSelector((state: State) => state.ctx.contractData)
  const [thisData, setThisData] = useState<ContractType | null>(null)

  useEffect(() => {
    if (contracts.length > 0) {
      const thisContractData = contracts.filter(
        (ct: ContractType) => ct.chaincodename === contractName
      )
      setThisData(thisContractData[0])
    }
  }, [contracts, contractName])

  const contractType = getContractType(contractName)

  logger("Contract Details: This Data", "response", thisData)

  const latestVersion = Number(
    thisData?.codes[thisData?.codes.length - 1].version
  )

  return (
    <div className="section-single">
      {thisData !== null ? ( // Null means still loading
        thisData === undefined ? ( // Undefined means result returned empty
          <div className={style.noData}>
            No data associated with this contract
          </div>
        ) : (
          <>
            <ContractDetailTable contractData={thisData} />
            <ContractTextBlock contractType={contractType} />
          </>
        )
      ) : (
        <>
          <ContractDetailTableSkeleton />
          <ContractTextSkeleton />
        </>
      )}
      {/* This includes its own skeleton */}
      <ContractTabbedSection
        contractName={contractName}
        latestVersion={latestVersion}
        contractVersions={thisData?.codes.length}
      />
    </div>
  )
}

export default ContractDetails
