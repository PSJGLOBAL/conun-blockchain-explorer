import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"

import TransactionTable from "../../components/TransactionTable"
import PaginationMenu from "../../components/PaginationMenu"

import TableButton from "../../components/TableButton"

import { setTxnActivityData, setChannelStats } from "../../store/actions"

import { State } from "../../utility/types"
import useChannelHash from "../../hooks/useChannelHash"
import usePaginate from "../../hooks/usePaginate"

const TxnActivitySection = () => {
  const txnActivityData = useSelector(
    (state: State) => state.txn.txnActivityData
  )

  const channelStats = useSelector((state: State) => state.basic.channelStats)
  const { getFirstPage, getNextPage, getPrevPage, prevent } = usePaginate(
    setTxnActivityData,
    Number(channelStats.txCount),
    "txn"
  )
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [maxTxn, setMaxTxn] = useState<number | string>(channelStats.txCount)

  const activeChannelHash = useChannelHash()
  const bottomTXN = txnActivityData[9]

  const dispatch = useDispatch()
  const location = useLocation()
  const fullPage = location.pathname.startsWith("/txns")

  const doPseudoPaginate = (mode: string) => {
    if (!prevent) {
      switch (mode) {
        case "first":
          getFirstPage()
          setCurrentPage(1)
          break
        case "next":
          if (bottomTXN.id) {
            getNextPage(currentPage, Number(bottomTXN.id))
            setCurrentPage(currentPage + 1)
          }
          break

        case "prev":
          if (bottomTXN.id) {
            if (currentPage - 1 >= 1) {
              getPrevPage(currentPage, Number(bottomTXN.id))
              setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1)
            }
          }
          break

        default:
          console.log("Pagination action not possible")
          break
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    if (activeChannelHash) {
      dispatch(setChannelStats(activeChannelHash))
      dispatch(setTxnActivityData(activeChannelHash))
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
            max={Math.floor(Number(maxTxn) / 10) || null}
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
