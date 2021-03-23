import { useEffect } from "react"

import TxnDataBlock from "../../components/MainPage/TxnDataBlock/TxnDataBlock"

import { TXNTableSkeleton } from "../../ui/Skeletos/MainTableSkeleton/MainTableSkeleton"
import DuplicateSkeleton from "../../ui/Skeletos/DuplicateSkeleton/DuplicateSkeleton"

import { State } from "../../utility/types"

import tableStyle from "../../style/css/table.module.css"

type Props = {
  txnData: State["txn"]["txnActivityData"] | null
  fullPage: boolean
}

const TransactionTable = ({ txnData, fullPage }: Props) => {
  // The hash cell size is flexible
  // This function sets the header size to the same as the other cells' sizes.
  function matchHashCellSize() {
    const hashCells = document.getElementsByClassName(`${tableStyle.hash}`)
    if (hashCells.length > 1) {
      const headerCell = hashCells[0] as HTMLElement
      const topCell = hashCells[1]
      headerCell.style.width = `${topCell.clientWidth}px`
    }
  }
  // It doesn't work without this!
  useEffect(() => {
    matchHashCellSize()
  })

  useEffect(() => {
    window.addEventListener("resize", () => matchHashCellSize())
    return () => {
      window.removeEventListener("resize", () => matchHashCellSize())
    }
  })

  return (
    <>
      <div className="">
        {/* HEADER */}
        <div className={`${tableStyle.row} ${tableStyle.header}`}>
          <div className={`${tableStyle.identicon} ${tableStyle.hiding}`}></div>
          <div className={tableStyle.service}>Service</div>
          <div id="header-hash-cell" className={`${tableStyle.hash}`}>
            Hash
          </div>
          <div className={tableStyle.time}>Time</div>
        </div>

        {/* TXN Activity - Table for each block made - shows hashes, created at, etc*/}
        {txnData && txnData.length > 0 ? (
          txnData.map((i) => (
            <TxnDataBlock key={i.txhash} fullPage={fullPage} data={i} />
          ))
        ) : (
          <DuplicateSkeleton howMany={10}>
            <TXNTableSkeleton />
          </DuplicateSkeleton>
        )}
      </div>
    </>
  )
}

export default TransactionTable
