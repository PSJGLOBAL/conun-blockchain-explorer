import TxnDataBlock from "../../components/MainPage/TxnDataBlock/TxnDataBlock"

import { TXNTableSkeleton } from "../../ui/Skeletos/MainTableSkeleton/MainTableSkeleton"
import DuplicateSkeleton from "../../ui/Skeletos/DuplicateSkeleton/DuplicateSkeleton"

import { State } from "../../utility/types"

import style from "./TransactionTable.module.css"

type Props = {
  txnData: State["txn"]["txnActivityData"] | null
  fullPage: boolean
}

const TransactionTable = ({ txnData, fullPage }: Props) => {
  return (
    <div className={style.cont}>
      <table className={style.table}>
        {/* HEADER */}
        <thead>
          <th>Icon</th>
          <th>Hash/Time</th>
          <th>Service</th>
          <th>To/From</th>
          <th>Action</th>
        </thead>

        {/* TXN Activity - Table for each block made - shows hashes, created at, etc*/}
        <tbody>
          {txnData && txnData.length > 0 ? (
            txnData.map((i) => (
              <TxnDataBlock key={i.txhash} fullPage={fullPage} data={i} />
            ))
          ) : (
            <DuplicateSkeleton howMany={10}>
              <TXNTableSkeleton />
            </DuplicateSkeleton>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable
