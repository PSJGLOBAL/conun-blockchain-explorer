import { Link } from "react-router-dom"
import ContractIcon from "../../../ui/ContractIcon/ContractIcon"
import TimeStampCell from "../../utilityComponents/TimeStampCell/TimeStampCell"

type Props = {
  txhash: string | number
  createdt: string | number
  validation_code: string
  channelname: string | number
  chaincodename: string | number
  creator_msp_id: string | number
  payload_proposal_hash: string | number
}

const ValidityIcon = ({ validity }: { validity: string }) => {
  if (validity === "VALID") {
    return (
      <span className="validity-icon valid">
        <i className="fas fa-check-circle"></i>
        <span>Success</span>
      </span>
    )
  }
  return (
    <span className="validity-icon invalid">
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
}: Props) => {
  return (
    <div>
      <div className="details-table-row scrolly">
        <div className="info-col info-key">Transaction Hash:</div>
        <div className="info-col info-val selectable monofont">{txhash}</div>
      </div>
      <div className="details-table-row">
        <div className="info-col info-key">Timestamp:</div>
        <div className="info-col info-val selectable monofont">
          <TimeStampCell time={createdt} timeStyle="round" />
          <span>({new Date(createdt).toUTCString()})</span>
        </div>
      </div>
      <div className="details-table-row">
        <div className="info-col info-key">Validity:</div>
        <div className="info-col info-val monofont">
          <ValidityIcon validity={validation_code} />
        </div>
      </div>
      <div className="details-table-row">
        <div className="info-col info-key">Contract:</div>
        <div className="info-col info-val selectable monofont">
          <Link to={`/contracts/${chaincodename}`}>
            <span>
              <ContractIcon serviceType={chaincodename} />
            </span>
          </Link>
          <span>{chaincodename}</span>
        </div>
      </div>
      <div className="details-table-row scrolly">
        <div className="info-col info-key">Payload Proposal Hash:</div>
        <div className="info-col info-val selectable monofont">
          {payload_proposal_hash}
        </div>
      </div>
    </div>
  )
}

export default TxnDetailsTable
