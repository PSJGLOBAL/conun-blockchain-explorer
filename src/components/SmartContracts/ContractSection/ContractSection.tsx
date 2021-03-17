import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import ContractIcon from "../../ContractIcon/ContractIcon"

import { State, ContractType } from "../../../utility/types"

import "./ContractSection.css"

const ContractSection = () => {
  const contracts = useSelector((state: State) => state.ctx.contractData)

  return (
    <section className="section-block section-single">
      <div className="section-title">
        <span>Smart Contracts</span>
      </div>
      <div className="data-table-row data-table-header contracts-header">
        <div className="contract-table-name-cell">Name</div>
        <div className="contract-table-icon-cell">Icon</div>
        <div className="contract-table-ver-cell">Versions</div>
      </div>
      {contracts.length > 0 &&
        contracts.map((ct: ContractType) => (
          <div
            className="data-table-row no-animate smart-contract-row"
            key={ct.chaincodename}
          >
            {/* Contract Name */}
            <div className="contract-table-name-cell">
              <Link
                className="info-table-link"
                to={`/contracts/${ct.chaincodename}`}
              >
                {ct.chaincodename}
              </Link>
            </div>
            {/* Contract Icon */}
            <div className="contract-table-icon-cell">
              <ContractIcon serviceType={ct.chaincodename} />
            </div>
            {/* Versions */}
            <div className="contract-table-ver-cell">
              <span className="contract-version-count">{ct.codes.length}</span>
            </div>
          </div>
        ))}
      <div className="contracts-see-more">
        <a
          href="https://github.com/CONUN-Global/conun-blockchain-smartcontract"
          target="_blank"
          rel="noreferrer"
        >
          Read More on GitHub
        </a>
      </div>
    </section>
  )
}

export default ContractSection
