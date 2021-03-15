import { useParams } from "react-router-dom"

import ContractIcon from "../../../ContractIcon/ContractIcon"

const ContractDetailTable = () => {
  const { contractName } = useParams<Record<string, string | undefined>>()
  return (
    <section className="contract-detail-table">
      <div className="cell">
        <span className="cell-title">Title</span>
        <span className="cell-content">{contractName}</span>
      </div>
      <div className="cell">
        <span className="cell-title">Author</span>
        <span className="cell-content">Conun</span>
      </div>
      <div className="cell">
        <span className="cell-title">Type</span>
        <span className="cell-content">
          {contractName && <ContractIcon serviceType={contractName} />}
          <span className="contract-name">{contractName}</span>
        </span>
      </div>
      <div className="cell">
        <span className="cell-title">Date</span>
        <span className="cell-content">xx/xx/xx xx:xx:xx</span>
      </div>
    </section>
  )
}

export default ContractDetailTable