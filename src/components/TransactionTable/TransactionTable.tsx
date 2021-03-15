import { useEffect } from "react"

import { TxnDataBlock } from "../../components/MainPage/TxnDataBlock/TxnDataBlock"

import { TXNTableSkeleton } from "../../ui/Skeletos/MainTableSkeleton/MainTableSkeleton"
import { DuplicateSkeleton } from "../../ui/Skeletos/DuplicateSkeleton/DuplicateSkeleton"

import { State } from "../../utility/types"

type Props = {
  txnData: State["txn"]["txnActivityData"]
  fullPage: boolean
}

export const TransactionTable = ({ txnData, fullPage }: Props) => {
  // The hash cell size is flexible
  // This function sets the header size to the same as the other cells' sizes.
  function matchHashCellSize() {
    const hashCells = document.getElementsByClassName("hash-cell")
    if (hashCells.length > 1) {
      const headerCell = hashCells[0] as HTMLElement
      const topCell = hashCells[1]
      headerCell.style.width = `${topCell.clientWidth}px`
    }
  }

  useEffect(() => {
    matchHashCellSize()
  })

  window.addEventListener("resize", () => {
    matchHashCellSize()
  })

  return (
    <>
      <div className="">
        {/* HEADER */}
        <div className="data-table-row data-table-header">
          <div className="identicon-cell hiding-cell"></div>
          <div className="service-cell">Service</div>
          <div id="header-hash-cell" className="hash-cell">
            Hash
          </div>
          <div className="time-cell">Time</div>
        </div>

        {/* TXN Activity - Table for each block made - shows hashes, created at, etc*/}
        {txnData && txnData.length > 0 ? (
          txnData.map((i) => (
            <TxnDataBlock key={i.txhash} fullPage={fullPage} data={{ ...i }} />
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
