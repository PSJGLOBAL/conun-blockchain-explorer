import { Link } from "react-router-dom"

import IdenticonLink from "../../utilityComponents/IdenticonLink/IdenticonLink"
import HashCell from "../../utilityComponents/HashCell/HashCell"
import TimeStampCell from "../../utilityComponents/TimeStampCell/TimeStampCell"

import { ObjectType } from "../../../utility/types"
import { truncate } from "../../../utility/functions"

import style from "../../../style/css/maintables.module.css"

type Props = {
  fullPage: boolean
  data: ObjectType
}

const BlockNumCell = ({num}:{num:string|number}) => {
  return <span className={style.blockNum}><Link to={`/blocks/${num}`}>{num}</Link></span>
}

const BlockDataBlock = ({fullPage, data}: Props) => {
  return (

    <div className={style.row}>
      <div className={style.iconCell}>
        <IdenticonLink destination={`/blocks/${data.blocknum}`} />
      </div>
      <div className={style.blockNumCell}>
        <BlockNumCell num={data.blocknum}/>
      </div>
      <div className={style.iconCell}>
        <span className={style.txnCount}>{data.txcount}</span>
      </div>
      <div className={style.hashCell}>
        <HashCell hash={truncate(data.blockhash, 6)}/>
      </div>
      <div className={style.actionCell}>
        <TimeStampCell time={data.createdt} timeStyle="round" />
      </div>
 
    </div>

  )
}

export default BlockDataBlock
