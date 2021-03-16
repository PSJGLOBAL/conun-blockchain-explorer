import { useParams } from "react-router-dom"

import ContractDetailTable from "../ContractDetailTable/ContractDetailTable"
import ContractTabbedSection from "../ContractTabbedSection/ContractTabbedSection"
import ContractTextBlock from "../ContractTextBlock/ContractTextBlock"

import { getContractType } from "../../../../utility/functions"

import "./ContractDetails.css"

const ContractDetails = () => {
  const { contractName } = useParams<Record<string, string | undefined>>()

  const contractType = getContractType(contractName)

  return (
    <div className="section-block section-single">
      <ContractDetailTable contractName={contractName} />
      <ContractTextBlock contractType={contractType} />
      <ContractTabbedSection contractName={contractName} />
    </div>
  )
}

export default ContractDetails
