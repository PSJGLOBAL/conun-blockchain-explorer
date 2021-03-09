import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"

import axios from "../../../axios/axiosinst"
import { ObjectType, State } from "../../../utility/types"

interface Props {
  txnID?: string | null
}

export const TransactionDetails = (props: Props) => {
  const [txnData, setTxnData] = useState<ObjectType>({})
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  let history = useHistory()

  useEffect(() => {
    window.scrollTo(0, 0)
  })

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
      <div className="">
        <div className="details-table-row scrolly">
          <div className="info-col info-key">Transaction Hash:</div>
          <div className="info-col info-val selectable monofont">
            {txnData.txhash}
          </div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Timestamp:</div>
          <div className="info-col info-val selectable monofont">
            {txnData.createdt}
          </div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Validity:</div>
          <div className="info-col info-val selectable monofont">
            {txnData.validation_code}
          </div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Channel:</div>
          <div className="info-col info-val selectable monofont">
            {txnData.channelname}
          </div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Contract:</div>
          <div className="info-col info-val selectable monofont">
            {txnData.chaincodename}
          </div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Creator ID:</div>
          <div className="info-col info-val selectable monofont">
            {txnData.creator_msp_id}
          </div>
        </div>
        <div className="details-table-row scrolly">
          <div className="info-col info-key">Payload Proposal Hash:</div>
          <div className="info-col info-val selectable monofont">
            {txnData.payload_proposal_hash}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="details-table" id="txn-details-table">
      <div className="details-table-header">
        <h2>Transaction Details</h2>
        <div className="details-table-links-box">
          <div
            className="details-table-header-link"
            id="table-back-link"
            onClick={() => history.goBack()}
          >
            <i className="fas fa-arrow-circle-left"></i>
          </div>
          <div className="details-table-header-link">
            <NavLink to="/" id="table-home-link">
              <i className="fas fa-home"></i>
            </NavLink>
          </div>
        </div>
      </div>
      {content}
    </div>
  )
}
