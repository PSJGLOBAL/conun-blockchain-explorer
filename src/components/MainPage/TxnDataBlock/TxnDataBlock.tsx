import { NavLink } from "react-router-dom"

import TimeStampCell from "../../utilityComponents/TimeStampCell/TimeStampCell"
import IdenticonLink from "../../utilityComponents/IdenticonLink/IdenticonLink"
import ContractIcon from "../../../ui/ContractIcon/ContractIcon"

import { ObjectType } from "../../../utility/types"
import { truncate } from "../../../utility/functions"

import style from "./TxnDataBlock.module.css"

interface Props {
  fullPage: boolean
  data: ObjectType
}

const HashCell = ({ hash, link }: { hash: string; link?: string | number }) => {
  if (link) {
    return (
      <div className={style.hash}>
        <NavLink to={link.toString()}>{hash}</NavLink>
      </div>
    )
  }
  return <div className={style.hash}>{hash}</div>
}

const ActionValueCell = ({
  action,
  value,
}: {
  action: string | number
  value: string | number
}) => {
  let icon
  let valueString
  if (action) {
    switch (action) {
      case "Transfer":
        icon = <i className="fas fa-exchange-alt"></i>
        valueString = `${value} CON`
        break
      case "Mint":
        icon = <i className="fas fa-plus-circle"></i>
        valueString = `${value} CON`
        break
      default:
        icon = action.toString().substring(0, 2)
        break
    }
  } else {
    icon = "Ac"
    valueString = "Value"
  }

  return (
    <>
      <span className={style.action}>{icon}</span>
      <span className={style.value}>{valueString}</span>
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
