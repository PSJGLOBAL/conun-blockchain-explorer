import { useState, memo } from "react"
import Identicon from "react-identicons"
import { formatDistanceToNowStrict } from "date-fns"

import { TxnModal } from "../TxnModal/TxnModal"

import { truncate } from "../../../utility/functions"
import { ObjectType } from "../../../utility/types"
import ReactTooltip from "react-tooltip"

import "./TxnDataBlock.css"
import "../../../style/table-common.css"
interface Props {
  data: ObjectType
}

export const TxnDataBlock = memo((props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const closeModal = () => {
    console.log("MODAL: Close")
    setShowModal(false)
  }

  const openModal = () => {
    console.log("MODAL: Open")
    setShowModal(true)
  }

  let icon = null
  if (props.data.chaincodename === "coin") {
    icon = (
      <i
        className="fas fa-coins font-hilite"
        data-tip={props.data.chaincodename}
      ></i>
    )
  }
  return (
    <div className="info-table recent-txn-table">
      <div className="info-table-col info-table-icon-col" onClick={openModal}>
        <div className="info-table-icon-cell">
          <Identicon
            fg="#ffffff"
            size={15}
            string={props.data.txhash.toString()}
          />
        </div>
      </div>

      <div className="info-table-col">
        {icon ? (
          icon
        ) : (
          <>
            <span className="font-hilite">C:</span>
            <span data-tip={props.data.chaincodename}>
              {props.data.chaincodename}
            </span>
          </>
        )}
      </div>
      <div className="info-table-col">
        <span className="font-hilite">#:</span>
        <span data-tip={props.data.txhash}>
          {truncate(props.data.txhash.toString())}
        </span>
      </div>
      <div className="info-table-col">
        <span className="font-hilite">T:</span>
        <span data-tip={props.data.createdt}>
          {formatDistanceToNowStrict(new Date(props.data.createdt))} ago
        </span>
      </div>
      {showModal && (
        <TxnModal
          txnID={props.data.txhash.toString()}
          clickHandler={closeModal}
        />
      )}
      <ReactTooltip />
    </div>
  )
})

// <div className="info-table-outer txn-data-table">
//       <div className="info-table-icon">
//         <Identicon size={15} string={props.data.txhash.toString()} />
//       </div>
//       <div
//         className="info-table txn-data-table"
//         onClick={() => setShowModal(true)}
//       >
//         <div className="info-table-row block-txn-row">
//           <div className="info-col info-key">Transaction Hash:</div>
//           <div className="info-col info-val">
//             {truncate(props.data.txhash.toString())}
//           </div>
//         </div>
//         <div className="info-table-row block-txn-row">
//           <div className="info-col info-key">Contract:</div>
//           <div className="info-col info-val">{props.data.chaincodename}</div>
//         </div>
//         <div className="info-table-row block-txn-row">
//           <div className="info-col info-key">Created At:</div>
//           <div className="info-col info-val">{props.data.createdt}</div>
//         </div>
//       </div>
