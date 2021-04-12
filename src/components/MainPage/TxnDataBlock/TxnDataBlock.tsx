import HashCell from "../../utilityComponents/HashCell/HashCell"
import TimeStampCell from "../../utilityComponents/TimeStampCell/TimeStampCell"
import IdenticonLink from "../../utilityComponents/IdenticonLink/IdenticonLink"
import ContractIcon from "../../../ui/ContractIcon/ContractIcon"
import ToFromLink from "../../utilityComponents/ToFromLink/ToFromLink"

import { ObjectType } from "../../../utility/types"
import { truncate, multiclass } from "../../../utility/functions"

import style from "../../../style/css/maintables.module.css"

interface Props {
  fullPage: boolean
  data: ObjectType
}

const ActionValueCell = ({
  action,
  value,
  fullPage,
}: {
  action: string | number
  value: string | number
  fullPage: boolean
}) => {
  if (action) {
    switch (action) {
      case "Transfer":
      case "Mint":
      case "Burn":
        const trunc = fullPage ? 14 : 7

        return (
          <span className={style.value}>{`${truncate(
            value,
            trunc,
            true
          )} CONX`}</span>
        )
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

          <ToFromLink dest={from.toString()} inner={truncate(from, 6)} />
        </div>
      )}
      {to && (
        <div className={style.tofrom}>
          <i className="fas fa-chevron-right" />
          <ToFromLink dest={to.toString()} inner={truncate(to, 6)} />
        </div>
      )}
    </>
  )
}

const TxnDataBlock = ({ fullPage, data }: Props) => {
  return (
    <div className={style.row}>
      <div className={style.iconCell}>
        <IdenticonLink destination={`/txns/${data.txhash}`} />
      </div>
      <div className={multiclass(style.hashCell, "hash-cell")}>
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
          <ActionValueCell
            action={data.tx_action}
            value={data.tx_value}
            fullPage={fullPage}
          />
        )}
      </div>
    </div>
  )
}

export default TxnDataBlock
