import { useParams, useHistory, NavLink } from "react-router-dom"

import ContractDetailTable from "../ContractDetailTable/ContractDetailTable"
import ContractHistoryTable from "../ContractHistoryTable/ContractHistoryTable"
import ContractTextBlock from "../ContractTextBlock/ContractTextBlock"

import { getContractType } from "../../../../utility/functions"

import "./ContractDetails.css"

const ContractDetails = () => {
  const { contractName } = useParams<Record<string, string | undefined>>()

  const contractType = getContractType(contractName)

  let history = useHistory()

  return (
    <div className="section-block section-single">
      <ContractDetailTable contractName={contractName} />
      <ContractTextBlock contractType={contractType} />
      <ContractHistoryTable contractName={contractName} />
      <div className="contract-link-box">
        <NavLink
          className="section-table-link"
          id="contracts-home"
          to="/contracts"
        >
          Back to Smart Contracts
        </NavLink>
        <div
          className="section-table-link"
          id="contracts-home"
          onClick={() => history.goBack()}
        >
          Back to Last Page
        </div>
      </div>
    </div>
  )
}

export default ContractDetails
