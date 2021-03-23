import { useState } from "react"
import { NavLink } from "react-router-dom"

import IdenticonLink from "../../utilityComponents/IdenticonLink/IdenticonLink"
import FlexHashCell from "../../utilityComponents/FlexHashCell/FlexHashCell"
import TimeStampCell from "../../utilityComponents/TimeStampCell/TimeStampCell"

import { ObjectType } from "../../../utility/types"

import tableStyle from "../../../style/css/table.module.css"

// import "./BlockDataBlock.css"
// import "../../../style/css/table-common.css"

type Props = {
  fullPage: boolean
  data: ObjectType
}
const BlockDataBlock = (props: Props) => {
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
      <article
        className={`${tableStyle.row} ${tableStyle.scrolly} block-data-row`}
      >
        {/* IDENTICON */}
        <IdenticonLink destination={`/blocks/${props.data.blocknum}`} />
        {/* BLOCKNUM */}
        <div className={tableStyle.blocknum}>
          <NavLink className="" to={`/blocks/${props.data.blocknum}`}>
            <span className="monofont font-clicky">{props.data.blocknum}</span>
          </NavLink>
        </div>
        {/* HASH CELL */}
        <div
          className={`${tableStyle.hash} ${tableStyle.hiding} result-hash-cell`}
        >
          <FlexHashCell
            fullPage={props.fullPage}
            limit={truncateLimit}
            hash={props.data.blockhash.toString()}
          />
        </div>
        {/* TIMESTAMP */}
        <TimeStampCell time={props.data.createdt} timeStyle="mini" />
        {/* TXCOUNT */}
        <div className={tableStyle.txncount}>
          <span className="font-hilite">{props.data.txcount}</span>
        </div>
      </article>
    </>
  )
}

export default BlockDataBlock
