import { useState, useEffect } from "react"
import { NavLink, useHistory } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"

import { TxnDataBlock } from "../../components/MainPage/TxnDataBlock/TxnDataBlock"
import { PaginationMenu } from "../../components/MainPage/PaginationMenu/PaginationMenu"

import { setTxnActivityData, setChannelStats } from "../../store/actions"

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
  const channelStats = useSelector((state: State) => state.basic.channelStats)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [maxTxn, setMaxTxn] = useState<number | string>(channelStats.txCount)

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

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  useEffect(() => {
    if (maxTxn === undefined) {
      dispatch(setChannelStats(activeChannelHash))
      dispatch(setTxnActivityData(activeChannelHash))
      setCurrentPage(1)
    }
  }, [activeChannelHash, maxTxn, dispatch])

  useEffect(() => {
    setMaxTxn(channelStats.txCount)
  }, [channelStats.txCount])

  return (
    <section
      className={fullPage ? "section-block section-full" : "section-block"}
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
      <div className="new-table-container new-txn-table table-block">
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
