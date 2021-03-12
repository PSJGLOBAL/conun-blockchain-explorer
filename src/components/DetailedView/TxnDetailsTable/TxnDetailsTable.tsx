type Props = {
  txhash: string | number
  createdt: string | number
  validation_code: string | number
  channelname: string | number
  chaincodename: string | number
  creator_msp_id: string | number
  payload_proposal_hash: string | number
}

const TxnDetailsTable = ({
  txhash,
  createdt,
  validation_code,
  channelname,
  chaincodename,
  creator_msp_id,
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
        <div className="info-col info-val selectable monofont">{createdt}</div>
      </div>
      <div className="details-table-row">
        <div className="info-col info-key">Validity:</div>
        <div className="info-col info-val selectable monofont">
          {validation_code}
        </div>
      </div>
      <div className="details-table-row">
        <div className="info-col info-key">Channel:</div>
        <div className="info-col info-val selectable monofont">
          {channelname}
        </div>
      </div>
      <div className="details-table-row">
        <div className="info-col info-key">Contract:</div>
        <div className="info-col info-val selectable monofont">
          {chaincodename}
        </div>
      </div>
      <div className="details-table-row">
        <div className="info-col info-key">Creator ID:</div>
        <div className="info-col info-val selectable monofont">
          {creator_msp_id}
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
