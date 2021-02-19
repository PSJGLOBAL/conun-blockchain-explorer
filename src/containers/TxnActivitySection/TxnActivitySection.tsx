import { NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"

import { TxnDataBlock } from "../../components/MainPage/TxnDataBlock/TxnDataBlock"
import { PaginationMenu } from "../../components/MainPage/PaginationMenu/PaginationMenu"

import { setTxnActivityData } from "../../store/actions"

import "../../components/MainPage/InterfaceMain/InterfaceMain.css"

import { State } from "../../utility/types"

type Props = {
  mainpage?: true
}

export const TxnActivitySection = (props: Props) => {
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash
  const txnActivityData = useSelector(
    (state: State) => state.txn.txnActivityData
  )
  const bottomTXN = txnActivityData[9]
  const dispatch = useDispatch()

  const history = useHistory()
  const fullPage = history.location.pathname === "/txns"

  const doPseudoPaginate = (mode: string) => {
    switch (mode) {
      case "first":
        dispatch(setTxnActivityData(activeChannelHash))
        break
      case "next":
        dispatch(setTxnActivityData(activeChannelHash, bottomTXN.id))
        break
      case "prev":
        let target = Number(bottomTXN.id)
        target += 20 // It's 20 because bottomTXN is already -10
        dispatch(setTxnActivityData(activeChannelHash, target))
        break

      default:
        console.log("Pagination action not possible")
        break
    }
  }

  return (
    <section
      className={
        fullPage
          ? "section section-block section-full"
          : "section section-block"
      }
    >
      <div className="section-title">
        <span>Recent Transactions</span>
        {fullPage && <PaginationMenu doPseudoPaginate={doPseudoPaginate} />}
      </div>
      <>
        <div className="info-table recent-txn-header">
          <div className="table-header-cell"> </div>
          <div className="table-header-cell">Service</div>
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
      </>
    </section>
  )
}
