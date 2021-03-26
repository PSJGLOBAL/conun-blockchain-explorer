import { NavLink } from "react-router-dom"

import DetailsTableRow from "../DetailsTableRow/DetailsTableRow"

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
    <div>
      <DetailsTableRow keyCell="Block Number" value={blocknum} select />
      <DetailsTableRow keyCell="Block Size" value={blksize} />
      <DetailsTableRow keyCell="Block Hash" value={blockhash} scroll />
      <DetailsTableRow keyCell="Data Hash" value={datahash} scroll />
      <DetailsTableRow keyCell="Previous Hash" value={prehash} scroll />
      <DetailsTableRow keyCell={`Transactions (${txcount})`}>
        {txhash.map((t: string) => (
          <NavLink className={style.txLink} to={`/txns/${t}`}>
            {t}
          </NavLink>
        ))}
      </DetailsTableRow>
    </div>
  )
}

export default BlockDetailsTable
