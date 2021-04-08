import { NavLink } from "react-router-dom"

import DetailsTableRow from "../DetailsTableRow/DetailsTableRow"

import { multiclass } from "../../../utility/functions"

import style from "../Details.module.css"

type Props = {
  blocknum: string
  blksize: string
  blockhash: string
  datahash: string
  prehash: string
  txcount: string
  txhash: Array<string>
}

const BlockDetailsTable = ({
  blocknum,
  blksize,
  blockhash,
  datahash,
  prehash,
  txcount,
  txhash,
}: Props) => {
  return (
    <div className={style.container}>
      <DetailsTableRow keyCell="Block Number" value={blocknum} select />
      <DetailsTableRow keyCell="Block Size" value={blksize} />
      <DetailsTableRow keyCell="Block Hash" value={blockhash} />
      <DetailsTableRow keyCell="Data Hash" value={datahash} />
      <DetailsTableRow keyCell="Previous Hash" value={prehash} />
      <DetailsTableRow keyCell={`Transactions (${txcount})`}>
        {txhash.map((t: string) => (
          <NavLink
            className={multiclass(style.txLink, "block-txn-link")}
            to={`/txns/${t}`}
          >
            {t}
          </NavLink>
        ))}
      </DetailsTableRow>
    </div>
  )
}

export default BlockDetailsTable
