import { useState } from "react"
import { formatDistanceToNowStrict } from "date-fns"

import { BlockModal } from "../BlockModal/BlockModal"

import { truncate } from "../../../utility/functions"
import { ObjectType } from "../../../utility/types"
import Identicon from "react-identicons"
import ReactTooltip from "react-tooltip"
import "./BlockDataBlock.css"

type Props = {
  fullPage: boolean
  data: ObjectType
}

export const BlockDataBlock = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const closeModal = () => {
    console.log("MODAL: Close")
    setShowModal(false)
  }

  const openModal = () => {
    console.log("MODAL: Open")
    setShowModal(true)
  }

  return (
    <div className="info-table-row">
      <div className="info-table recent-block-table table-animate">
        <div className="info-table-col info-table-icon-col" onClick={openModal}>
          <div className="info-table-icon-cell">
            <Identicon size={15} string={props.data.blockhash.toString()} />
          </div>
        </div>
        <div className="info-table-col">
          <span className="font-hilite">{props.data.blocknum}</span>
        </div>
        <div className="info-table-col">
          <span data-tip={props.data.blockhash}>
            {props.fullPage
              ? props.data.blockhash.toString()
              : truncate(props.data.blockhash.toString())}
          </span>
        </div>
        <div className="info-table-col">
          <span className="font-hilite" data-tip={props.data.createdt}>
            {formatDistanceToNowStrict(new Date(props.data.createdt))} ago
          </span>
        </div>

        <div className="info-table-col info-table-txcount-col">
          <div className="info-table-txcount-cell">
            {/* <span>Tx:</span> */}
            <span className="font-hilite">{props.data.txcount}</span>
          </div>
        </div>
      </div>
      {showModal === true ? (
        <BlockModal
          blocknum={props.data.blocknum.toString()}
          clickHandler={closeModal}
        />
      ) : null}
      <ReactTooltip backgroundColor="#e95654" />
    </div>
  )
}
