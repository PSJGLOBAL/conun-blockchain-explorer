import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import ContractIcon from "../../../ui/ContractIcon/ContractIcon"

import { State, ContractType } from "../../../utility/types"

import style from "./ContractSection.module.css"
import tableStyle from "../../../style/css/table.module.css"

const ContractSection = () => {
  const contracts = useSelector((state: State) => state.ctx.contractData)

  return (
    <section className="section-block section-single">
      <div className="section-title">
        <span>Smart Contracts</span>
      </div>
      <div className={`${tableStyle.row} ${tableStyle.header}`}>
        <div className={style.name}>Name</div>
        <div className={style.icon}>Icon</div>
        <div className={style.version}>Versions</div>
      </div>
      {contracts.length > 0 &&
        contracts.map((ct: ContractType) => (
          <div
            className={`${tableStyle.row} ${tableStyle.still}`}
            key={ct.chaincodename}
          >
            {/* Contract Name */}
            <div className={style.name}>
              <Link
                className={tableStyle.link}
                to={`/contracts/${ct.chaincodename}`}
              >
                {ct.chaincodename}
              </Link>
            </div>
            {/* Contract Icon */}
            <div className={style.icon}>
              <ContractIcon serviceType={ct.chaincodename} />
            </div>
            {/* Versions */}
            <div className={style.version}>
              <span className="contract-version-count">{ct.codes.length}</span>
            </div>
          </div>
        ))}
      <div className={style.seeMore}>
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
