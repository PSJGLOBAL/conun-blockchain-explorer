import ContractIcon from "../../../../ui/ContractIcon/ContractIcon"
import style from "./ContractDetailTable.module.css"

type Props = {
  contractName: string | undefined
}

const ContractDetailTable = ({ contractName }: Props) => {
  return (
    <section className={style.table}>
      <div className={style.cell}>
        <span className={style.title}>Title</span>
        <span className={style.content}>{contractName}</span>
      </div>
      <div className={style.cell}>
        <span className={style.title}>Author</span>
        <span className={style.content}>Conun</span>
      </div>
      <div className={style.cell}>
        <span className={style.title}>Type</span>
        <span className={style.content}>
          {contractName && <ContractIcon serviceType={contractName} />}
          <span className="contract-name">{contractName}</span>
        </span>
      </div>
      <div className={style.cell}>
        <span className={style.title}>Date</span>
        <span className={style.content}>xx/xx/xx xx:xx:xx</span>
      </div>
    </section>
  )
}

export default ContractDetailTable
