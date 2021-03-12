import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"

import TxnDetailsTable from "../TxnDetailsTable/TxnDetailsTable"
import DetailsSkeleton from "../../../ui/Skeletos/DetailsSkeleton/DetailsSkeleton"
import { DuplicateSkeleton } from "../../../ui/Skeletos/DuplicateSkeleton/DuplicateSkeleton"

import axios from "../../../axios/axiosinst"
import { State } from "../../../utility/types"
import { logger } from "../../../utility/functions"

interface Props {
  txnID?: string | null
}

export const TransactionDetails = (props: Props) => {
  const [txnData, setTxnData] = useState<any>(null)
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  let history = useHistory()

  // Force window to scroll up on load
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  // Do GET if provided a blocknum
  useEffect(() => {
    if (props.txnID) {
      axios
        .get(`/transaction/${activeChannelHash}/${props.txnID}`)
        .then((response) => {
          logger("TXN DETAILS: ", "response", response)
          if (response.data.status === 400 || response.data.status === "400") {
            logger("TXN DETAILS: Bad Request: ", "error")
            history.push(`/error?type=bad_transaction&terms=${props.txnID}`)
          } else {
            setTxnData(response.data.row)
          }
        })
        .catch((e) => {
          console.error(e)
          history.push(`/error?type=no_response&terms=search`)
        })
    }
  }, [activeChannelHash, props.txnID, history])

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
      {txnData ? (
        <TxnDetailsTable
          txhash={txnData.txhash}
          createdt={txnData.createdt}
          validation_code={txnData.validation_code}
          channelname={txnData.channelname}
          chaincodename={txnData.chaincodename}
          creator_msp_id={txnData.creator_msp_id}
          payload_proposal_hash={txnData.payload_proposal_hash}
        />
      ) : (
        <DuplicateSkeleton howMany={7}>
          <DetailsSkeleton />
        </DuplicateSkeleton>
      )}
    </div>
  )
}
