import { Link } from "react-router-dom"

import IdenticonLink from "../../../components/IdenticonLink"
import HashCell from "../../../components/HashCell"
import TimeStampCell from "../../../components/TimeStampCell"

import { ObjectType } from "../../../utility/types"
import { truncate, multiclass } from "../../../utility/functions"

import style from "../../../style/css/maintables.module.css"
import Tooltip from "../../../components/Tooltip"

type Props = {
  fullPage: boolean
  data: ObjectType
}

const BlockNumCell = ({ num }: { num: string | number }) => {
  return (
    <span className={multiclass(style.blockNum, "block-number")}>
      <Link to={`/blocks/${num}`}>{num}</Link>
    </span>
  )
}

const BlockDataBlock = ({ fullPage, data }: Props) => {
  return (
    <div className={multiclass(style.row, "block-data-row")}>
      <Tooltip id="block-tips" place="right">
        <div className={style.iconCell}>
          <IdenticonLink destination={`/blocks/${data.blocknum}`} />
        </div>
        <div
          className={multiclass(style.blockNumCell, "block-number")}
          data-tip="Block Number"
          data-for="block-tips"
        >
          <BlockNumCell num={data.blocknum} />
        </div>
        <div
          className={style.iconCell}
          data-tip="Transaction Count"
          data-for="block-tips"
        >
          <span className={style.txnCount}>{data.txcount}</span>
        </div>
        <div
          className={style.hashCell}
          data-tip="Block Hash"
          data-for="block-tips"
        >
          <HashCell hash={truncate(data.blockhash, 6)} />
        </div>
        <div
          className={style.actionCell}
          data-tip="Created At"
          data-for="block-tips"
        >
          <TimeStampCell time={data.createdt} timeStyle="round" />
        </div>
      </Tooltip>
    </div>
  )
}

export default BlockDataBlock
