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
  let contractIcon = null

  switch (props.data.chaincodename) {
    case "coin":
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
      {/* IDENTICON */}
      <div className="new-table-identicon-cell">
        <NavLink to={`/txns/${props.data.txhash}`}>
          <div className="">
            <Identicon size={15} string={props.data.txhash.toString()} />
          </div>
        </NavLink>
      </div>

      {/* CONTRACT ICON */}
      <div className="">{contractIcon}</div>
      {/* HASH CELL */}
      <div className="">
        <span className="" data-tip={props.data.txhash}>
          <NavLink
            className={"info-table-link font-clicky monofont"}
            to={`/txns/${props.data.txhash}`}
          >
            <span className={props.fullPage ? "selectable" : ""}>
              {props.fullPage
                ? props.data.txhash.toString()
                : truncate(props.data.txhash.toString())}
            </span>
          </NavLink>
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
      <div className="new-table-border-cell"></div>
      <ReactTooltip backgroundColor="#e95654" />
    </>
  )
}
