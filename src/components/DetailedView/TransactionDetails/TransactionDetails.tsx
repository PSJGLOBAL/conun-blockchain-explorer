import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import axios from "../../../axios/axiosinst"
import { ObjectType, State } from "../../../utility/types"

interface Props {
  txnID?: string | null
}

export const TransactionDetails = (props: Props) => {
  const [txnData, setTxnData] = useState<ObjectType>({})
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  useEffect(() => {
    if (props.txnID) {
      axios
        .get(`/transaction/${activeChannelHash}/${props.txnID}`)
        .then((response) => {
          setTxnData(response.data.row)
        })
        .catch((e) => console.error(e))
    }
  }, [activeChannelHash, props.txnID])

  let content = (
    <div className="details-table-row">
      <div className="info-col info-key">Error:</div>
      <div className="info-col info-val">No data was found</div>
    </div>
  )

  if (txnData) {
    content = (
      <>
        <div className="details-table-row">
          <div className="info-col info-key">Transaction Hash:</div>
          <div className="info-col info-val">{txnData.txhash}</div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Timestamp:</div>
          <div className="info-col info-val">{txnData.createdt}</div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Validity:</div>
          <div className="info-col info-val">{txnData.validation_code}</div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Channel:</div>
          <div className="info-col info-val">{txnData.channelname}</div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Contract:</div>
          <div className="info-col info-val">{txnData.chaincodename}</div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Creator ID:</div>
          <div className="info-col info-val">{txnData.creator_msp_id}</div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Payload Proposal Hash:</div>
          <div className="info-col info-val">
            {txnData.payload_proposal_hash}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="details-table">
      <div className="details-table-header">
        <h2>Transaction Details</h2>
        <div className="details-table-header-link">
          <NavLink to="/">
            <i className="fas fa-undo"></i>
          </NavLink>
        </div>
      </div>
      {content}
    </div>
  )
}