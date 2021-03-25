import { Link } from "react-router-dom"
import ContractIcon from "../../../ui/ContractIcon/ContractIcon"
import TimeStampCell from "../../../components/utilityComponents/TimeStampCell/TimeStampCell"

import style from "../Details.module.css"

type Props = {
  chaincodename: string | number
  createdt: string | number
  payload_proposal_hash: string | number
  tx_action: string
  tx_value: string
  tx_to: string
  tx_from: string
  txhash: string | number
  validation_code: string
}

const ValidityIcon = ({ validity }: { validity: string }) => {
  if (validity === "VALID") {
    return (
      <span className={style.validIcon}>
        <i className="fas fa-check-circle"></i>
        <span>Success</span>
      </span>
    )
  }
  return (
    <span className={style.invalidIcon}>
      <i className="fas fa-times-circle"></i>
      <span>Failure</span>
    </span>
  )
}

const TxnDetailsTable = ({
  txhash,
  createdt,
  validation_code,
  chaincodename,
  payload_proposal_hash,
  tx_to,
  tx_from,
  tx_action,
  tx_value
}: Props) => {
  return (
    <div>
      <div className={`${style.row} ${style.scrolly}`}>
        <div className={style.key}>Transaction Hash:</div>
        <div className={style.selectVal}>{txhash}</div>
      </div>
      <div className={style.row}>
        <div className={style.key}>Timestamp:</div>
        <div className={style.selectVal}>
          <TimeStampCell time={createdt} timeStyle="round" />
          <span>({new Date(createdt).toUTCString()})</span>
        </div>
      </div>
      <div className={style.row}>
        <div className={style.key}>Validity:</div>
        <div className={style.val}>
          <ValidityIcon validity={validation_code} />
        </div>
      </div>
      <div className={style.row}>
        <div className={style.key}>Contract:</div>
        <div className={style.selectVal}>
          {chaincodename ? (
            <Link to={`/contracts/${chaincodename}`}>
              <span>
                <ContractIcon serviceType={chaincodename} />
              </span>
            </Link>
          ) : (
            <span>
              <ContractIcon serviceType={chaincodename} />
            </span>
          )}
          <span>{chaincodename}</span>
        </div>
      </div>
      <div className={style.row}>
        <div className={style.key}>To:</div>
        <div className={style.selectVal}>{tx_to}</div>
      </div>
      <div className={style.row}>
        <div className={style.key}>From:</div>
        <div className={style.selectVal}>{tx_from}</div>
      </div>
      <div className={style.row}>
        <div className={style.key}>Action:</div>
        <div className={style.val}>{tx_action}</div>
      </div>
      <div className={style.row}>
        <div className={style.key}>Value:</div>
        <div className={style.val}>{tx_value}</div>
      </div>
      <div className={`${style.row} ${style.scrolly}`}>
        <div className={style.key}>Payload Proposal Hash:</div>
        <div className={style.selectVal}>{payload_proposal_hash}</div>
      </div>
    </div>
  )
}

export default TxnDetailsTable
