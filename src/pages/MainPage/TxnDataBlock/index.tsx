import HashCell from "../../../components/HashCell"
import TimeStampCell from "../../../components/TimeStampCell"
import IdenticonLink from "../../../components/IdenticonLink"
import ContractIcon from "../../../ui/ContractIcon"
import ToFromLink from "../../../components/ToFromLink"

import { ObjectType } from "../../../utility/types"
import { truncate, multiclass } from "../../../utility/functions"

import style from "../../../style/css/maintables.module.css"
import Tooltip from "../../../components/Tooltip"

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
      <Tooltip id="txn-tips" place="right">
        <div className={style.iconCell}>
          <IdenticonLink destination={`/txns/${data.txhash}`} />
        </div>
        <div
          className={multiclass(style.hashCell, "hash-cell")}
          data-for="txn-tips"
          data-tip="Transaction hash / Timestamp"
        >
          <HashCell
            link={`/txns/${data.txhash}`}
            hash={truncate(data.txhash, 6)}
          />
          <TimeStampCell time={data.createdt} timeStyle="round" />
        </div>
        <div
          className={style.iconCell}
          data-for="txn-tips"
          data-tip="Smart Contract"
        >
          <ContractIcon
            serviceType={data.chaincodename}
            link={`/contracts/${data.chaincodename}`}
          />
        </div>
        <div
          className={style.hashCell}
          data-for="txn-tips"
          data-tip="To / From Addresses"
        >
          <ToFromCells to={data.tx_to} from={data.tx_from} />
        </div>
        <div
          className={style.actionCell}
          data-for="txn-tips"
          data-tip={data.tx_action ? "Action Performed" : "Lifecycle Process"}
        >
          {data.tx_action && data.tx_value && (
            <ActionValueCell
              action={data.tx_action}
              value={data.tx_value}
              fullPage={fullPage}
            />
          )}
        </div>
      </Tooltip>
    </div>
  )
}

export default TxnDataBlock
