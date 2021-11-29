import { Link } from "react-router-dom"

import DetailsTableRow from "../DetailsTableRow"
import ContractIcon from "../../../ui/ContractIcon"
import TimeStampCell from "../../../components/TimeStampCell"
import ToFromLink from "../../../components/ToFromLink"

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

const uniformValue = (value: string, action: string) => {
  switch (action) {
    case "Transfer":
    case "Mint":
      return `${(Number(value) / 1e18).toFixed(20).replace(/\.?0+$/, "")}`

    default:
      return `${(Number(value) / 1e18).toFixed(20).replace(/\.?0+$/, "")}`
  }
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
  tx_value,
}: Props) => {
  return (
    <div className={style.container}>
      <DetailsTableRow keyCell="Transaction Hash" value={txhash} copy />
      <DetailsTableRow keyCell="Timestamp">
        <TimeStampCell time={createdt} timeStyle="round" elaborate />
      </DetailsTableRow>
      <DetailsTableRow keyCell="Validity">
        <ValidityIcon validity={validation_code} />
      </DetailsTableRow>
      <DetailsTableRow keyCell="Contract">
        <span className={style.contract}>
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
        </span>
      </DetailsTableRow>
      {tx_from && (
        <DetailsTableRow keyCell="From" scroll>
          <ToFromLink dest={tx_from} inner={tx_from} />
        </DetailsTableRow>
      )}
      {tx_to && (
        <DetailsTableRow keyCell="To" scroll>
          <ToFromLink dest={tx_to} inner={tx_to} />
        </DetailsTableRow>
      )}
      {tx_action && <DetailsTableRow keyCell="Action" value={tx_action} />}
      {tx_value && (
        <DetailsTableRow
          keyCell="Value"
          value={uniformValue(tx_value, tx_action)}
          copy={tx_action !== "Transfer" && tx_action !== "Mint"}
        />
      )}
      <DetailsTableRow
        keyCell="Payload Proposal Hash"
        value={payload_proposal_hash}
      />
    </div>
  )
}

export default TxnDetailsTable
