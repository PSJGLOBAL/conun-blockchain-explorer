import ContractDetailTable from "../ContractDetailTable/ContractDetailTable"
import ContractHistoryTable from "../ContractHistoryTable/ContractHistoryTable"
import ContractTextBlock from "../ContractTextBlock/ContractTextBlock"

import "./ContractDetails.css"

const ContractDetails = () => {
  return (
    <div className="section-block section-single">
      <ContractDetailTable />
      <ContractTextBlock />
      <ContractHistoryTable />
    </div>
  )
}

export default ContractDetails
