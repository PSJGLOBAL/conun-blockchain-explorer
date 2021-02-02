import { NavLink } from "react-router-dom"

import { useSelector } from "react-redux"

import { TxnDataBlock } from "../../components/MainPage/TxnDataBlock/TxnDataBlock"

import "../../components/MainPage/InterfaceMain/InterfaceMain.css"

import { State } from "../../utility/types"

type Props = {
  mainpage?: true
}

export const TxnActivitySection = (props: Props) => {
  const txnActivityData = useSelector(
    (state: State) => state.txn.txnActivityData
  )

  return (
    <section className="section">
      <div className="section-title">
        <NavLink to={props.mainpage ? "/explorer/txns" : "/explorer"}>
          Recent Transactions
        </NavLink>
      </div>
      <div className="section-block">
        <div className="info-table recent-txn-header">
          <div className="table-header-cell"> </div>
          <div className="table-header-cell">Contract</div>
          <div className="table-header-cell">Hash</div>
          <div className="table-header-cell">Time</div>
        </div>
        {/* Block Activity - Table for each block made - shows hashes, created at, etc*/}
        {txnActivityData.map((i) => (
          <TxnDataBlock key={i.txhash} data={{ ...i }} />
        ))}
      </div>
    </section>
  )
}
