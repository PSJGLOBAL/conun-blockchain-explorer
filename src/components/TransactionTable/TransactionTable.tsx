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
      <div className={style.table}>
        {/* HEADER */}
        <div>
          <div>Icon</div>
          <div>Hash/Time</div>
          <div>Service</div>
          <div>To/From</div>
          <div>Action</div>
        </div>

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
      </div>
    </div>
  )
}

export default TransactionTable
