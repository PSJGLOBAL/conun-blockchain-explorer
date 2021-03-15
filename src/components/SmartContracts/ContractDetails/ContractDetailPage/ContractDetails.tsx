import { useParams, NavLink } from "react-router-dom"

import ContractDetailTable from "../ContractDetailTable/ContractDetailTable"
import ContractHistoryTable from "../ContractHistoryTable/ContractHistoryTable"
import ContractTextBlock from "../ContractTextBlock/ContractTextBlock"

import "./ContractDetails.css"

const ContractDetails = () => {
  const { contractName } = useParams<Record<string, string | undefined>>()
  return (
    <div className="section-block section-single">
      <ContractDetailTable contractName={contractName} />
      <ContractTextBlock />
      <ContractHistoryTable contractName={contractName} />
      <div>
        <NavLink
          className="section-table-link"
          id="contracts-home"
          to={"/contracts"}
        >
          Back to Smart Contracts
        </NavLink>
      </div>
    </div>
  )
}

export default ContractDetails
