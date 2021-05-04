import TimeStampCell from "../../../utilityComponents/TimeStampCell/TimeStampCell"

import ContractIcon from "../../../../ui/ContractIcon/ContractIcon"
import style from "./ContractDetailTable.module.css"

type Props = {
  contractData: any
}

const ContractDetailTable = ({ contractData }: Props) => {
  return (
    <section className={style.table}>
      <div className={style.cell}>
        <span className={style.title}>Title</span>
        <span className={style.content}>{contractData.chaincodename}</span>
      </div>
      <div className={style.cell}>
        <span className={style.title}>Author</span>
        <span className={style.content}>Conun</span>
      </div>
      <div className={style.cell}>
        <span className={style.title}>Type</span>
        <span className={style.content}>
          {contractData.chaincodename && (
            <ContractIcon serviceType={contractData.chaincodename} />
          )}
          <span className="contract-name">{contractData.chaincodename}</span>
        </span>
      </div>
      <div className={style.cell}>
        <span className={style.title}>Updated</span>
        <TimeStampCell
          time={contractData.codes[0].createdt}
          timeStyle="round"
          elaborate
        />
      </div>
    </section>
  )
}

export default ContractDetailTable
