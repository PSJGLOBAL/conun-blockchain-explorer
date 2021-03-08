import { useState } from "react"

import { NavLink } from "react-router-dom"

import ReactTimeAgo from "react-time-ago"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"

import Identicon from "react-identicons"
import ReactTooltip from "react-tooltip"

import { truncate } from "../../../utility/functions"
import { ObjectType } from "../../../utility/types"

import ninjaIcon from "../../../style/images/extra_icons/icon_ninja_star.svg"
import defaultIcon from "../../../style/images/extra_icons/icon_wibbly_arrows.svg"
import familiarIcon from "../../../style/images/extra_icons/icon_i_know_this_one.svg"

import "./TxnDataBlock.css"
import "../../../style/css/table-common.css"

interface Props {
  fullPage: boolean
  data: ObjectType
}

TimeAgo.addLocale(en)

export const TxnDataBlock = (props: Props) => {
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

  let contractIcon = null

  switch (props.data.chaincodename) {
    case "coin":
    case "conun":
      contractIcon = (
        <img
          src={ninjaIcon}
          data-tip={"Coin"}
          className="contract-icon-image"
          alt=""
        />
      )
      break

    case "ConunDrive":
      contractIcon = (
        <img
          src={familiarIcon}
          data-tip={"Conun Drive"}
          className="contract-icon-image"
          alt=""
        />
      )
      break
    case "_lifecycle":
      contractIcon = (
        <img
          src={defaultIcon}
          data-tip={"Contract Deployment"}
          className="contract-icon-image"
          alt=""
        />
      )
      break
    default:
      contractIcon = <span>{props.data.chaincodename}</span>
  }

  return (
    <>
      <article className="data-table-row scrolly">
        {/* IDENTICON */}
        <div className="identicon-cell hiding-cell">
          <NavLink to={`/txns/${props.data.txhash}`}>
            <div className="">
              <Identicon size={15} string={props.data.txhash.toString()} />
            </div>
          </NavLink>
        </div>

        {/* CONTRACT ICON */}
        <div className="service-cell">{contractIcon}</div>
        {/* HASH CELL */}
        <div className="hash-cell">
          <span className="" data-tip={props.data.txhash}>
            <NavLink
              className={"font-clicky monofont"}
              to={`/txns/${props.data.txhash}`}
            >
              <span className={props.fullPage ? "selectable" : ""}>
                {props.fullPage
                  ? truncate(props.data.txhash.toString(), truncateLimit)
                  : truncate(props.data.txhash.toString())}
              </span>
            </NavLink>
          </span>
        </div>

        {/* TIMESTAMP */}
        <div className="time-cell">
          <span data-tip={props.data.createdt}>
            <ReactTimeAgo
              date={new Date(props.data.createdt)}
              locale="en-US"
              tooltip={false}
              timeStyle="mini"
            />
          </span>
        </div>
      </article>
      <ReactTooltip backgroundColor="#e95654" />
    </>
  )
}
