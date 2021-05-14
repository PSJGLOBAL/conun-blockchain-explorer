import { useState } from "react"

import axios from "../../../axios/axiosinst"
import useChannelHash from "../../../hooks/useChannelHash"

import { multiclass } from "../../../utility/functions"

import style from "./WalletDetailTable.module.css"

const WalletDetailTable = ({ walletHash }: { walletHash: string }) => {
  const [totalTxns, setTotalTxns] = useState("")

  const activeChannelHash = useChannelHash()

  axios
    .get(`/status/userActivity/${activeChannelHash}/${walletHash}`)
    .then((res) => {
      setTotalTxns(res.data.row[0].tx_count)
    })

  return (
    <section className={style.table}>
      <div className={style.cell}>
        <span className={style.title}>Wallet Address</span>
        <span className={multiclass(style.content, "wallet-hash")}>
          {walletHash}
        </span>
      </div>
      <div className={style.cell}>
        <span className={style.title}>Total Transactions</span>
        <span className={multiclass(style.content, "total-txns")}>
          {totalTxns}
        </span>
      </div>
    </section>
  )
}

export default WalletDetailTable
