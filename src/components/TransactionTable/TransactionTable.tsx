import TxnDataBlock from "../../components/MainPage/TxnDataBlock/TxnDataBlock"

import { TXNTableSkeleton } from "../../ui/Skeletos/MainTableSkeleton/MainTableSkeleton"
import DuplicateSkeleton from "../../ui/Skeletos/DuplicateSkeleton/DuplicateSkeleton"

import { State } from "../../utility/types"

import style from "../../style/css/maintables.module.css"
import { multiclass } from "../../utility/functions"

type Props = {
  txnData: State["txn"]["txnActivityData"] | null
  fullPage: boolean
}

const TransactionTable = ({ txnData, fullPage }: Props) => {
  const containerStyle = fullPage
    ? multiclass(style.fullpage, style.container)
    : multiclass(style.mainpage, style.container)

  return (
    <div className={containerStyle}>
      <div className={style.table}>
        {/* TXN Activity - Table for each block made - shows hashes, created at, etc*/}
        <>
          {/* Nested ternery operators WARNING lol */}
          {txnData ? ( // If TXN data is not null, a response was received
            txnData.length > 0 ? ( // If the length is 0, then there were no transactions
              txnData.map((i) => (
                <TxnDataBlock key={i.txhash} fullPage={fullPage} data={i} />
              ))
            ) : (
              <div className={style.noHistory}>
                No transaction history found.
              </div>
            )
          ) : (
            // Show the skeleton when there was no response received
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
