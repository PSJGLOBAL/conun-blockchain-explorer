import { useState } from "react"

import { BlockModal } from "../BlockModal/BlockModal"

import { truncate } from "../../utility/functions"
import { ObjectType } from "../../utility/types"
import Identicon from "react-identicons"
interface Props {
  data: ObjectType
}

export const BlockDataBlock = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className="info-table-outer block-data-table">
      <div className="info-table-icon">
        <Identicon size={15} string={props.data.blockhash.toString()} />
      </div>
      <div
        className="info-table block-data-table"
        onClick={() => setShowModal(true)}
      >
        <div className="info-row">
          <div className="info-col info-key">Block Number:</div>
          <div className="info-col info-val">{props.data.blocknum}</div>
        </div>
        <div className="info-row">
          <div className="info-col info-key">Block Hash:</div>
          <div className="info-col info-val">
            <span>{truncate(props.data.blockhash.toString())}</span>
          </div>
        </div>
        <div className="info-row">
          <div className="info-col info-key">Created At:</div>
          <div className="info-col info-val">{props.data.createdt}</div>
        </div>
        <div className="info-row">
          <div className="info-col info-key">Tx Count:</div>
          <div className="info-col info-val">{props.data.txcount}</div>
        </div>
      </div>
      {showModal && (
        <BlockModal
          blocknum={props.data.blocknum.toString()}
          clickHandler={closeModal}
        />
      )}
    </div>
  )
}
