import { NavLink } from "react-router-dom"

import ReactTimeAgo from "react-time-ago"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"

import Identicon from "react-identicons"
import ReactTooltip from "react-tooltip"

import { truncate } from "../../../utility/functions"
import { ObjectType } from "../../../utility/types"

import ninjaIcon from "../../../style/images/extra_icons/icon_ninja_star.svg"

import "./TxnDataBlock.css"
import "../../../style/css/table-common.css"

interface Props {
  fullPage: boolean
  data: ObjectType
}

TimeAgo.addLocale(en)

export const TxnDataBlock = (props: Props) => {
  let icon = null
  if (props.data.chaincodename === "coin") {
    icon = (
      <img
        src={ninjaIcon}
        data-tip={props.data.chaincodename}
        className="contract-icon-image"
        alt=""
      />
    )
  }
  return (
    <div className="info-table-row">
      <div className="info-table recent-txn-table table-animate">
        <div className="info-table-identicon-col">
          <div className="info-table-col info-table-icon-col">
            <NavLink to={`/txns/${props.data.txhash}`}>
              <div className="info-table-icon-cell">
                <Identicon size={15} string={props.data.txhash.toString()} />
              </div>
            </NavLink>
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
        <div className="info-table-col">
          <span data-tip={props.data.createdt}>
            <ReactTimeAgo
              date={new Date(props.data.createdt)}
              locale="en-US"
              tooltip={false}
              timeStyle="round"
            />
          </span>
        </div>
      </div>
      <ReactTooltip backgroundColor="#e95654" />
    </div>
  )
}
