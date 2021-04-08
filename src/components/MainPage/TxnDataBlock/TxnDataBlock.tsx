import { Link } from "react-router-dom"

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
        return <span className={style.value}>{action}</span>
    }
  } else {
    return <span>&nbsp;</span>
  }
}

// At some point, action will say 'deploy' and trigger something here.
const ToFromCells = ({
  to,
  from,
}: {
  to: string | number
  from: string | number
}) => {
  if (!to && !from) {
    return (
      <>
        <div className={style.tofrom}>LIFECYCLE PROCESS</div>
        <div className={style.tofrom}>Contract Deployed</div>
      </>
    )
  }

  return (
    <>
      {from && (
        <div className={style.tofrom}>
          <i className="fas fa-chevron-left" />
          <Link to={`/wallets/${from}`}>
            <HashCell hash={truncate(from, 6)} />
          </Link>
        </div>
      )}
      {to &&
        (to === "CONUN" ? (
          <div className={style.tofrom}>
            <i className="fas fa-chevron-right" />
            <HashCell hash={truncate(to, 6)} />
          </div>
        ) : (
          <div className={style.tofrom}>
            <i className="fas fa-chevron-right" />
            <Link to={`/wallets/${to}`}>
              <HashCell hash={truncate(to, 6)} />
            </Link>
          </div>
        ))}
    </>
  )
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
        <ToFromCells to={data.tx_to} from={data.tx_from} />
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
