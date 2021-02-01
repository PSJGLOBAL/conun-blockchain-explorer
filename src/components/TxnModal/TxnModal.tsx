import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { ObjectType, State } from "../../utility/types"

interface Props {
  clickHandler: () => void
  txnID: string
}

export const TxnModal = (props: Props) => {
  const [txnData, setTxnData] = useState<ObjectType>({})
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  useEffect(() => {
    axios
      .get(
        `http://192.168.100.105:8080/api/transaction/${activeChannelHash}/${props.txnID}`
      )
      .then((response) => {
        setTxnData(response.data.row)
      })
      .catch((e) => console.error(e))
  }, [activeChannelHash, props.txnID])

  let content = (
    <div className="modal-row">
      <div className="info-col info-key">Error:</div>
      <div className="info-col info-val">No data was found</div>
    </div>
  )

  if (txnData) {
    content = (
      <>
        <div className="modal-row">
          <div className="info-col info-key"></div>
          <div className="info-col info-val">
            <h4>Transaction Details</h4>
          </div>
        </div>
        <div className="modal-row">
          <div className="info-col info-key">Transaction Hash:</div>
          <div className="info-col info-val">{txnData.txhash}</div>
        </div>
        <div className="modal-row">
          <div className="info-col info-key">Timestamp:</div>
          <div className="info-col info-val">{txnData.createdt}</div>
        </div>
        <div className="modal-row">
          <div className="info-col info-key">Validity:</div>
          <div className="info-col info-val">{txnData.validation_code}</div>
        </div>
        <div className="modal-row">
          <div className="info-col info-key">Channel:</div>
          <div className="info-col info-val">{txnData.channelname}</div>
        </div>
        <div className="modal-row">
          <div className="info-col info-key">Contract:</div>
          <div className="info-col info-val">{txnData.chaincodename}</div>
        </div>
        <div className="modal-row">
          <div className="info-col info-key">Creator ID:</div>
          <div className="info-col info-val">{txnData.creator_msp_id}</div>
        </div>
        <div className="modal-row">
          <div className="info-col info-key">Payload Proposal Hash:</div>
          <div className="info-col info-val">
            {txnData.payload_proposal_hash}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="modal modal-background" onClick={props.clickHandler}>
      <div className="modal modal-table info-table">{content}</div>
    </div>
  )
}
