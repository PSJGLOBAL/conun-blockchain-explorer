import { multiclass } from "../../../utility/functions"
import style from "./WalletDetailTable.module.css"

const WalletDetailTable = ({ walletHash }: { walletHash: string }) => {
  return (
    <section className={style.table}>
      <div className={style.cell}>
        <span className={style.title}>Wallet Address</span>
        <span className={multiclass(style.content, "wallet-hash")}>
          {walletHash}
        </span>
      </div>
    </section>
  )
}

export default WalletDetailTable
