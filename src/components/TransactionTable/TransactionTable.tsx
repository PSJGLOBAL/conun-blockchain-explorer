import TxnDataBlock from "../../components/MainPage/TxnDataBlock/TxnDataBlock"

import { TXNTableSkeleton } from "../../ui/Skeletos/MainTableSkeleton/MainTableSkeleton"
import DuplicateSkeleton from "../../ui/Skeletos/DuplicateSkeleton/DuplicateSkeleton"

import { State } from "../../utility/types"
import { multiclass } from "../../utility/functions"

import style from "./TransactionTable.module.css"
import cellStyle from "../../components/MainPage/TxnDataBlock/TxnDataBlock.module.css"

type Props = {
  txnData: State["txn"]["txnActivityData"] | null
  fullPage: boolean
}

const TransactionTable = ({ txnData, fullPage }: Props) => {
  return (
    <div className={style.container}>
      <div className={style.table}>
        {/* HEADER */}
        {/* <div className={style.header}>
          <div className={cellStyle.iconCell}>&nbsp;</div>
          <div className={cellStyle.hashCell}>Hash/Time</div>
          <div className={cellStyle.iconCell}>Service</div>
          <div className={cellStyle.hashCell}>To/From</div>
          <div className={cellStyle.actionCell}>Action</div>
        </div> */}

        {/* TXN Activity - Table for each block made - shows hashes, created at, etc*/}
        <>
          {txnData && txnData.length > 0 ? (
            txnData.map((i) => (
              <TxnDataBlock key={i.txhash} fullPage={fullPage} data={i} />
            ))
          ) : (
            <DuplicateSkeleton howMany={10}>
              <TXNTableSkeleton />
            </DuplicateSkeleton>
          )}
        </>
      </div>
    </div>
  )
}

export default TransactionTable
