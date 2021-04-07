import { useState, useEffect } from "react"

import TxnDataBlock from "../../components/MainPage/TxnDataBlock/TxnDataBlock"

import { TXNTableSkeleton } from "../../ui/Skeletos/MainTableSkeleton/MainTableSkeleton"
import DuplicateSkeleton from "../../ui/Skeletos/DuplicateSkeleton/DuplicateSkeleton"

import { State } from "../../utility/types"

import style from "../../style/css/maintables.module.css"
import { multiclass, logger } from "../../utility/functions"

type Props = {
  txnData: State["txn"]["txnActivityData"] | null
  fullPage: boolean
}

const TransactionTable = ({ txnData, fullPage }: Props) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [success, setSuccess] = useState<boolean>(false)


  const doTimeout = () => {
    
    const t = setTimeout(() => {
      setLoading(false)
    }, 5000)

    return t
  }

  useEffect(() => {
    const t = doTimeout()

    return () => {
      clearTimeout(t)
    }
  }, [])

  useEffect(() => {

    setLoading(true)

    if (txnData && txnData.length > 0) {
      setLoading(false)
      setSuccess(true)
    }
  }, [txnData])



  const containerStyle = fullPage
    ? multiclass(style.fullpage, style.container)
    : multiclass(style.mainpage, style.container)
  logger("TXN TABLE: ", "get", txnData)


  let content:any = (
    <DuplicateSkeleton howMany={10}>
    <TXNTableSkeleton />
  </DuplicateSkeleton>    
  )


  if (!loading) {

      if (success) {
        if (txnData && txnData.length > 0) {
          content = txnData.map((i) => ( <TxnDataBlock key={i.txhash} fullPage={fullPage} data={i} />))        
        } else {
          content = <div className={style.noHistory}>No transaction history found.</div>
        }

      } else {
          content = <div className={style.noHistory}>No transaction history found.</div>
      } 
  }


  return (
    <div className={containerStyle}>
      <div className={style.table}>
        {/* TXN Activity - Table for each block made - shows hashes, created at, etc*/}
        <>
          {content}
        </>
      </div>
    </div>
  )
}

export default TransactionTable
