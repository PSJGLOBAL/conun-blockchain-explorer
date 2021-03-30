import { useState } from "react"
import { NavLink } from "react-router-dom"

import TimeStampCell from "../../utilityComponents/TimeStampCell/TimeStampCell"
import IdenticonLink from "../../utilityComponents/IdenticonLink/IdenticonLink"
import FlexHashCell from "../../utilityComponents/FlexHashCell/FlexHashCell"
import ContractIcon from "../../../ui/ContractIcon/ContractIcon"

import { ObjectType } from "../../../utility/types"
import { truncate } from "../../../utility/functions"

import style from "./TxnDataBlock.module.css"

interface Props {
  fullPage: boolean
  data: ObjectType
}

const HashCell = ({ hash }: { hash: string }) => {
  return <div className={style.hash}>{hash}</div>
}

const TxnDataBlock = ({ fullPage, data }: Props) => {
  return (
    <tr>
      <td>
        <IdenticonLink destination={`/txns/${data.txhash}`} />
      </td>
      <td>
        <HashCell hash={truncate(data.txhash, 6)} />
        <TimeStampCell time={data.createdt} timeStyle="round" />
      </td>
      <td>
        <ContractIcon serviceType={data.chaincodename} />
      </td>
      <td>
        <HashCell hash={truncate(data.tx_from, 6)} />
        <HashCell hash={truncate(data.tx_to, 6)} />
      </td>
      <td>
        <span>{data.tx_action}</span>
        <span>{data.tx_value}</span>
      </td>
    </tr>
  )
}

export default TxnDataBlock
