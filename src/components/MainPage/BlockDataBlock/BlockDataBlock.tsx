import { useState } from "react"
import { NavLink } from "react-router-dom"
import ReactTooltip from "react-tooltip"

import IdenticonLink from "../../utilityComponents/IdenticonLink/IdenticonLink"
import FlexHashCell from "../../utilityComponents/FlexHashCell/FlexHashCell"
import TimeStampCell from "../../utilityComponents/TimeStampCell/TimeStampCell"

import { ObjectType } from "../../../utility/types"
import "./BlockDataBlock.css"
import "../../../style/css/table-common.css"

type Props = {
  fullPage: boolean
  data: ObjectType
}
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
        <IdenticonLink destination={`/blocks/${props.data.blocknum}`} />
        {/* BLOCKNUM */}
        <div className="blocknum-cell">
          <NavLink className="" to={`/blocks/${props.data.blocknum}`}>
            <span className="monofont font-clicky">{props.data.blocknum}</span>
          </NavLink>
        </div>
        {/* HASH CELL */}
        <div className="hash-cell hiding-cell result-hash-cell">
          <FlexHashCell
            fullPage={props.fullPage}
            limit={truncateLimit}
            hash={props.data.blockhash.toString()}
          />
        </div>
        {/* TIMESTAMP */}
        <TimeStampCell time={props.data.createdt} />
        {/* TXCOUNT */}
        <div className="txncount-cell">
          <span className="font-hilite">{props.data.txcount}</span>
        </div>
      </article>
      <ReactTooltip backgroundColor="#e95654" />
    </>
  )
}
