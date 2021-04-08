import style from "./WalletDetailTable.module.css"

const WalletDetailTable = ({ walletHash }: { walletHash: string }) => {
  return (
    <section className={style.table}>
      <div className={style.cell}>
        <span className={style.title}>Wallet Address</span>
        <span className={style.content}>{walletHash}</span>
      </div>
    </section>
  )
}

export default WalletDetailTable
