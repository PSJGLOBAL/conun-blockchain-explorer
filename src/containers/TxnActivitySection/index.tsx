import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"

import TransactionTable from "../../components/TransactionTable"
import PaginationMenu from "../../components/PaginationMenu"

import TableButton from "../../components/TableButton"

import { setTxnActivityData, setChannelStats } from "../../store/actions"

import { State } from "../../utility/types"
import useChannelHash from "../../hooks/useChannelHash"

const TxnActivitySection = () => {
  const txnActivityData = useSelector(
    (state: State) => state.txn.txnActivityData
  )

  const channelStats = useSelector((state: State) => state.basic.channelStats)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [maxTxn, setMaxTxn] = useState<number | string>(channelStats.txCount)

  const activeChannelHash = useChannelHash()
  const bottomTXN = txnActivityData[9]

  const dispatch = useDispatch()
  const location = useLocation()
  const fullPage = location.pathname.startsWith("/txns")

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
  }, [location])

  useEffect(() => {
    if (activeChannelHash) {
      dispatch(setChannelStats(activeChannelHash))
      dispatch(setTxnActivityData(activeChannelHash))
      setCurrentPage(1)
    }
  }, [activeChannelHash, dispatch])

  useEffect(() => {
    setMaxTxn(channelStats.txCount)
  }, [channelStats.txCount])

  return (
    <section
      className={fullPage ? "section-block section-full" : "section-block"}
      id="recent-txns-table"
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
      <TransactionTable txnData={txnActivityData} fullPage={fullPage} />
      {/* BUTTON */}
      <div>
        <TableButton
          fullPage={fullPage}
          destination="/txns"
          htmlID="txn-table"
          altLabel="View More Transactions"
        />
      </div>
    </section>
  )
}

export default TxnActivitySection