import { useState } from "react"

import { BlockModal } from "../BlockModal/BlockModal"

import { truncate } from "../../utility/functions"
import { ObjectType } from "../../utility/types"
interface Props {
  data: ObjectType
}

export const BlockDataBlock = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
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
            {truncate(props.data.blockhash.toString())}
          </div>
        </div>
        <div className="info-row">
          <div className="info-col info-key">Created At:</div>
          <div className="info-col info-val">{props.data.createdt}</div>
        </div>
      </div>
      {showModal && <BlockModal data={props.data} clickHandler={closeModal} />}
    </>
  )
}
