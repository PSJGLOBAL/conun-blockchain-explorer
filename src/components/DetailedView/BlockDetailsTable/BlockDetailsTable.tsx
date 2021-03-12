import { NavLink } from "react-router-dom"

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
      <div className="details-table-row">
        <div className="info-col info-key">Block Number:</div>
        <div className="info-col info-val selectable monofont">{blocknum}</div>
      </div>
      <div className="details-table-row">
        <div className="info-col info-key">Block Size:</div>
        <div className="info-col info-val monofont">{blksize}</div>
      </div>
      <div className="details-table-row scrolly">
        <div className="info-col info-key">Block Hash:</div>
        <div className="info-col info-val selectable monofont">{blockhash}</div>
      </div>
      <div className="details-table-row scrolly">
        <div className="info-col info-key">Data Hash:</div>
        <div className="info-col info-val selectable monofont">{datahash}</div>
      </div>
      <div className="details-table-row scrolly">
        <div className="info-col info-key">Previous Hash:</div>
        <div className="info-col info-val selectable monofont">{prehash}</div>
      </div>
      <div className="details-table-row scrolly">
        <div className="info-col info-key">Transactions: {txcount}</div>
        <div className="info-col info-val">
          {txhash.map((t: string) => (
            <div key={t}>
              <NavLink className="info-table-link monofont" to={`/txns/${t}`}>
                {t}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlockDetailsTable
