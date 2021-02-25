import { useSelector } from "react-redux"

import { State, ContractType } from "../../../utility/types"

import "./ContractSection.css"

const ContractSection = () => {
  const contracts = useSelector((state: State) => state.ctx.contractData)

  let content = null

  if (contracts.length > 0) {
    content = contracts.map((ct: ContractType) => {
      return (
        <div className="info-table contract-block" key={ct.chaincodename}>
          <div className="contract-table-cell">{ct.chaincodename}</div>
          <div>{ct.codes.length}</div>
        </div>
      )
    })
  }

  return (
    <section className="section-block section-single">
      <div className="section-title">Smart Contracts</div>
      <div className="info-table contracts-header">
        <div className="table-header-cell">Name</div>
        <div className="table-header-cell">Versions</div>
      </div>
      {content}
    </section>
  )
}

export default ContractSection