import { NavLink } from "react-router-dom"

import { formatDistanceToNowStrict } from "date-fns"
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

export const BlockDataBlock = (props: Props) => {
  return (
    <div className="info-table-row">
      <div className="info-table recent-block-table table-animate">
        <div className="info-table-identicon-col">
          <div className="info-table-col info-table-icon-col">
            <NavLink
              className="info-table-link"
              to={`/blocks/${props.data.blocknum}`}
            >
              <div className="info-table-icon-cell">
                <Identicon size={15} string={props.data.blockhash.toString()} />
              </div>
            </NavLink>
          </div>
        </div>
        <div className="info-table-col">
          <span className="font-hilite">{props.data.blocknum}</span>
        </div>
        <div className="info-table-col">
          <span data-tip={props.data.blockhash}>
            {props.fullPage
              ? props.data.blockhash.toString()
              : truncate(props.data.blockhash.toString())}
          </span>
        </div>
        <div className="info-table-col">
          <span className="font-hilite" data-tip={props.data.createdt}>
            {formatDistanceToNowStrict(new Date(props.data.createdt))} ago
          </span>
        </div>

        <div className="info-table-col info-table-txcount-col">
          <div className="info-table-txcount-cell">
            <span className="font-hilite">{props.data.txcount}</span>
          </div>
        </div>
      </div>
      <ReactTooltip backgroundColor="#e95654" />
    </div>
  )
}
