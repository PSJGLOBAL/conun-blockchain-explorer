import { useState } from "react"
import { NavLink, useHistory } from "react-router-dom"

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
  const [currentPage, setCurrentPage] = useState<number>(1)

  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash
  const txnActivityData = useSelector(
    (state: State) => state.txn.txnActivityData
  )
  const channelStats = useSelector((state: State) => state.basic.channelStats)
  const maxTxn = channelStats.txCount
  const bottomTXN = txnActivityData[9]
  const dispatch = useDispatch()

  const history = useHistory()
  const fullPage = history.location.pathname === "/txns"

  const doPseudoPaginate = (mode: string) => {
    switch (mode) {
      case "first":
        dispatch(setTxnActivityData(activeChannelHash))
        setCurrentPage(1)
        break
      case "next":
        dispatch(setTxnActivityData(activeChannelHash, bottomTXN.id))
        setCurrentPage(currentPage + 1)
        break
      case "prev":
        let target = Number(bottomTXN.id)
        target += 20 // It's 20 because bottomTXN is already -10
        dispatch(setTxnActivityData(activeChannelHash, target))
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1)
        } else {
          setCurrentPage(1)
        }
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
          ? "section-block table-block section-full"
          : "table-block section-block"
      }
      id="txns"
    >
      <div className="section-title">
        <span>Recent Transactions</span>
        {fullPage && (
          <PaginationMenu
            currentPage={currentPage}
            max={maxTxn}
            doPseudoPaginate={doPseudoPaginate}
          />
        )}
      </div>
      <div className="new-table-container new-txn-table">
        {/* HEADER */}

        <div className=""></div>
        <div className="">Service</div>
        <div className="">Hash</div>
        <div className="">Time</div>

        {/* TXN Activity - Table for each block made - shows hashes, created at, etc*/}

        {txnActivityData.map((i) => (
          <TxnDataBlock key={i.txhash} fullPage={fullPage} data={{ ...i }} />
        ))}
      </div>
      {/* BUTTON */}
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
    </section>
  )
}
