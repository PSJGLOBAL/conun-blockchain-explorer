import { useState, memo } from "react"
import { formatDistanceToNowStrict } from "date-fns"

import { BlockModal } from "../BlockModal/BlockModal"

import { truncate } from "../../utility/functions"
import { ObjectType } from "../../utility/types"
import Identicon from "react-identicons"
import ReactTooltip from "react-tooltip"
import "./BlockDataBlock.css"
import { colourPallet } from "../../utility/colours"
interface Props {
  data: ObjectType
}

export const BlockDataBlock = memo((props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div
      className="info-table recent-block-table"
      onClick={() => setShowModal(true)}
    >
      <div className="info-table-col info-table-icon-col">
        <div className="info-table-icon-cell">
          <Identicon
            palette={colourPallet}
            size={15}
            string={props.data.blockhash.toString()}
          />
        </div>
      </div>
      <div className="info-table-col">
        <span className="font-hilite">B:</span>
        <span>{props.data.blocknum}</span>
      </div>
      <div className="info-table-col">
        <span className="font-hilite">#:</span>
        <span data-tip={props.data.blockhash}>
          {truncate(props.data.blockhash.toString())}
        </span>
      </div>
      <div className="info-table-col">
        <span className="font-hilite">T:</span>
        <span data-tip={props.data.createdt}>
          {formatDistanceToNowStrict(new Date(props.data.createdt))} ago
        </span>
      </div>

      <div className="info-table-col info-table-txcount-col">
        <div className="info-table-txcount-cell">
          <span className="font-hilite">Tx:</span>
          <span>{props.data.txcount}</span>
        </div>
      </div>

      {showModal && (
        <BlockModal
          blocknum={props.data.blocknum.toString()}
          clickHandler={closeModal}
        />
      )}
      <ReactTooltip />
    </div>
  )
})
