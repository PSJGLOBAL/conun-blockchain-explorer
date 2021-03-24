import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import DetailsTableHeader from "../DetailsTableHeader/DetailsTableHeader"
import TxnDetailsTable from "../TxnDetailsTable/TxnDetailsTable"
import DetailsSkeleton from "../../../ui/Skeletos/DetailsSkeleton/DetailsSkeleton"
import DuplicateSkeleton from "../../../ui/Skeletos/DuplicateSkeleton/DuplicateSkeleton"

import axios from "../../../axios/axiosinst"
import { State } from "../../../utility/types"
import { logger } from "../../../utility/functions"

import style from "../Details.module.css"


interface Props {
  txnID?: string | null
}

const TransactionDetails = (props: Props) => {
  const [txnData, setTxnData] = useState<any>(null)
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  let history = useHistory()

  // Force window to scroll up on load
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  // Do GET if provided a txnID
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
    <div className={style.table} id="txn-details-table">
      <DetailsTableHeader title={"Transaction Details"} />
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

export default TransactionDetails
