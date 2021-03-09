import { useState } from "react"

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
  const [winWidth, setWinWidth] = useState<number>(window.innerWidth)

  window.addEventListener("resize", () => {
    setWinWidth(window.innerWidth)
  })

  let truncateLimit = 0

  if (winWidth < 1000) {
    truncateLimit = Math.floor(winWidth / 50)
  } else {
    truncateLimit = -1
  }

  return (
    <>
      <article className="data-table-row scrolly">
        {/* IDENTICON */}
        <div className="identicon-cell hiding-cell">
          <NavLink className="" to={`/blocks/${props.data.blocknum}`}>
            <div className="">
              <Identicon size={15} string={props.data.blockhash.toString()} />
            </div>
          </NavLink>
        </div>

        {/* BLOCKNUM */}
        <div className="blocknum-cell">
          <NavLink className="" to={`/blocks/${props.data.blocknum}`}>
            <span className="monofont font-clicky">{props.data.blocknum}</span>
          </NavLink>
        </div>
        {/* HASH CELL */}
        <div className="hash-cell hiding-cell result-hash-cell">
          <span
            data-tip={props.data.blockhash}
            className={props.fullPage ? "monofont selectable" : "monofont"}
          >
            {props.fullPage
              ? truncate(props.data.blockhash.toString(), truncateLimit)
              : truncate(props.data.blockhash.toString())}
          </span>
        </div>
        {/* TIMESTAMP */}
        <div className="time-cell">
          <span data-tip={props.data.createdt} className="monofont">
            <ReactTimeAgo
              date={new Date(props.data.createdt)}
              locale="en-US"
              tooltip={false}
              timeStyle="mini"
            />{" "}
          </span>
        </div>

        {/* TXCOUNT */}
        <div className="txncount-cell">
          <span className="font-hilite">{props.data.txcount}</span>
        </div>
      </article>
      <ReactTooltip backgroundColor="#e95654" />
    </>
  )
}
