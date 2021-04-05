import HashCell from "../../utilityComponents/HashCell/HashCell"
import TimeStampCell from "../../utilityComponents/TimeStampCell/TimeStampCell"
import IdenticonLink from "../../utilityComponents/IdenticonLink/IdenticonLink"
import ContractIcon from "../../../ui/ContractIcon/ContractIcon"

import { ObjectType } from "../../../utility/types"
import { truncate } from "../../../utility/functions"

import style from "../../../style/css/maintables.module.css"

interface Props {
  fullPage: boolean
  data: ObjectType
}

const ActionValueCell = ({
  action,
  value,
}: {
  action: string | number
  value: string | number
}) => {
  if (action) {
    switch (action) {
      case "Transfer":
      case "Mint":
        return <span className={style.value}>{`${value} CONX`}</span>
      default:
        return <span className={style.value}>{`0 CONX`}</span>
    }
  } else {
    return <span>&nbsp;</span>
  }
}

const TxnDataBlock = ({ fullPage, data }: Props) => {
  return (
    <div className={style.row}>
      <div className={style.iconCell}>
        <IdenticonLink destination={`/txns/${data.txhash}`} />
      </div>
      <div className={style.hashCell}>
        <HashCell
          link={`/txns/${data.txhash}`}
          hash={truncate(data.txhash, 6)}
        />
        <TimeStampCell time={data.createdt} timeStyle="round" />
      </div>
      <div className={style.iconCell}>
        <ContractIcon
          serviceType={data.chaincodename}
          link={`/contracts/${data.chaincodename}`}
        />
      </div>
      <div className={style.hashCell}>
        {data.tx_from && (
          <div className={style.tofrom}>
            <i className="fas fa-chevron-left" />
            <HashCell hash={truncate(data.tx_from, 6)} />
          </div>
        )}
        {data.tx_to && (
          <div className={style.tofrom}>
            <i className="fas fa-chevron-right" />
            <HashCell hash={truncate(data.tx_to, 6)} />
          </div>
        )}
      </div>
      <div className={style.actionCell}>
        {data.tx_action && data.tx_value && (
          <ActionValueCell action={data.tx_action} value={data.tx_value} />
        )}
      </div>
    </div>
  )
}

export default TxnDataBlock
