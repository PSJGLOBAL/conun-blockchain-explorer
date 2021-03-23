import { useState } from "react"
import { NavLink } from "react-router-dom"

import TimeStampCell from "../../utilityComponents/TimeStampCell/TimeStampCell"
import IdenticonLink from "../../utilityComponents/IdenticonLink/IdenticonLink"
import FlexHashCell from "../../utilityComponents/FlexHashCell/FlexHashCell"
import ContractIcon from "../../../ui/ContractIcon/ContractIcon"

import { ObjectType } from "../../../utility/types"

import tableStyle from "../../../style/css/table.module.css"

interface Props {
  fullPage: boolean
  data: ObjectType
}

const TxnDataBlock = (props: Props) => {
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
        className={`${tableStyle.row} ${tableStyle.scrolly} transaction-data-row`}
      >
        {/* IDENTICON */}
        <IdenticonLink destination={`/txns/${props.data.txhash}`} />
        {/* CONTRACT ICON */}
        <div className={tableStyle.service}>
          <NavLink to={`/contracts/${props.data.chaincodename}`}>
            <ContractIcon serviceType={props.data.chaincodename} />
          </NavLink>
        </div>
        {/* HASH CELL */}
        <div className={tableStyle.hash}>
          <span className="" data-tip={props.data.txhash}>
            <NavLink
              className="font-clicky monofont"
              to={`/txns/${props.data.txhash}`}
            >
              <FlexHashCell
                fullPage={props.fullPage}
                limit={truncateLimit}
                hash={props.data.txhash.toString()}
              />
            </NavLink>
          </span>
        </div>

        {/* TIMESTAMP */}
        <TimeStampCell time={props.data.createdt} timeStyle="mini" />
      </article>
    </>
  )
}

export default TxnDataBlock
