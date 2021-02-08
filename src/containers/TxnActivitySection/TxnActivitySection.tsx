import { NavLink } from "react-router-dom"

import { useSelector } from "react-redux"

import { TxnDataBlock } from "../../components/MainPage/TxnDataBlock/TxnDataBlock"
import { PaginationMenu } from "../../components/MainPage/PaginationMenu/PaginationMenu"

import "../../components/MainPage/InterfaceMain/InterfaceMain.css"

import { State } from "../../utility/types"

import { RouteComponentProps } from "react-router-dom"

type Props = RouteComponentProps & {
  mainpage?: true
}

export const TxnActivitySection = (props: Props) => {
  const txnActivityData = useSelector(
    (state: State) => state.txn.txnActivityData
  )

  const fullPage = props.match.path === "/txns"

  return (
    <section className={fullPage ? "section section-full" : "section"}>
      <div className="section-title">
        <span>Recent Transactions</span>
        {fullPage && <PaginationMenu />}
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
          <TxnDataBlock key={i.txhash} fullPage={fullPage} data={{ ...i }} />
        ))}
        <div>
          {fullPage ? (
            <NavLink className="section-table-link" to={"/"}>
              Back To Home
            </NavLink>
          ) : (
            <NavLink className="section-table-link" to={"/txns"}>
              View More Transactions
            </NavLink>
          )}
        </div>
      </div>
    </section>
  )
}
