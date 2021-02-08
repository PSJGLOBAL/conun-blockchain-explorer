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
  fullPage: boolean
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
    <div className="info-table-row">
      <div className="info-table recent-txn-table table-animate">
        <div className="info-table-col info-table-icon-col" onClick={openModal}>
          <div className="info-table-icon-cell">
            <Identicon size={15} string={props.data.txhash.toString()} />
          </div>
        </div>

        <div className="info-table-col recent-txn-contract-icon-col">
          {icon ? (
            icon
          ) : (
            <>
              <span data-tip={props.data.chaincodename}>
                {props.data.chaincodename}
              </span>
            </>
          )}
        </div>
        <div className="info-table-col">
          <span
            className="info-table-content-span"
            data-tip={props.data.txhash}
          >
            <span data-tip={props.data.blockhash}>
              {props.fullPage
                ? props.data.txhash.toString()
                : truncate(props.data.txhash.toString())}
            </span>
          </span>
        </div>
        <div className="info-table-col">
          <span className="font-hilite" data-tip={props.data.createdt}>
            {formatDistanceToNowStrict(new Date(props.data.createdt))} ago
          </span>
        </div>
      </div>
      {showModal && (
        <TxnModal
          txnID={props.data.txhash.toString()}
          clickHandler={closeModal}
        />
      )}
      <ReactTooltip backgroundColor="#e95654" />
    </div>
  )
})
