import { useState, memo } from "react"

import { TxnModal } from "../TxnModal/TxnModal"

import { truncate } from "../../utility/functions"
import { ObjectType } from "../../utility/types"

import Identicon from "react-identicons"
interface Props {
  data: ObjectType
}

export const TxnDataBlock = memo((props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const closeModal = () => {
    setShowModal(false)
  }
  return (
    <div className="info-table-outer txn-data-table">
      <div className="info-table-icon">
        <Identicon size={15} string={props.data.txhash.toString()} />
      </div>
      <div
        className="info-table txn-data-table"
        onClick={() => setShowModal(true)}
      >
        <div className="info-table-row block-txn-row">
          <div className="info-col info-key">Transaction Hash:</div>
          <div className="info-col info-val">
            {truncate(props.data.txhash.toString())}
          </div>
        </div>
        <div className="info-table-row block-txn-row">
          <div className="info-col info-key">Contract:</div>
          <div className="info-col info-val">{props.data.chaincodename}</div>
        </div>
        <div className="info-table-row block-txn-row">
          <div className="info-col info-key">Created At:</div>
          <div className="info-col info-val">{props.data.createdt}</div>
        </div>
      </div>
      {showModal && (
        <TxnModal
          txnID={props.data.txhash.toString()}
          clickHandler={closeModal}
        />
      )}
    </div>
  )
})
