import { NavLink } from "react-router-dom"

import ReactTimeAgo from "react-time-ago"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"

import Identicon from "react-identicons"
import ReactTooltip from "react-tooltip"

import { truncate } from "../../../utility/functions"
import { ObjectType } from "../../../utility/types"
import "./BlockDataBlock.css"
import "../../../style/css/table-common.css"

type Props = {
  fullPage: boolean
  data: ObjectType
}

TimeAgo.addLocale(en)

export const BlockDataBlock = (props: Props) => {
  return (
    <>
      {/* IDENTICON */}
      <div className="new-table-identicon-cell">
        <NavLink className="" to={`/blocks/${props.data.blocknum}`}>
          <div className="">
            <Identicon size={15} string={props.data.blockhash.toString()} />
          </div>
        </NavLink>
      </div>

      {/* BLOCKNUM */}
      <div className="">
        <NavLink
          className="info-table-link"
          to={`/blocks/${props.data.blocknum}`}
        >
          <span className="font-clicky">{props.data.blocknum}</span>
        </NavLink>
      </div>
      {/* HASH CELL */}
      <div className="new-block-hash monofont">
        <span
          data-tip={props.data.blockhash}
          className={props.fullPage ? "selectable" : ""}
        >
          {props.fullPage
            ? props.data.blockhash.toString()
            : truncate(props.data.blockhash.toString())}
        </span>
      </div>
      {/* TIMESTAMP */}
      <div className="">
        <span data-tip={props.data.createdt}>
          <ReactTimeAgo
            date={new Date(props.data.createdt)}
            locale="en-US"
            tooltip={false}
            timeStyle="round"
          />
        </span>
      </div>

      {/* TXCOUNT */}
      <div className="new-table-txn-count-cell">
        <span className="font-hilite">{props.data.txcount}</span>
      </div>

      <div className="new-table-border-cell"></div>
      <ReactTooltip backgroundColor="#e95654" />
    </>
  )
}
