import { NavLink } from "react-router-dom"

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
      <div className={style.row}>
        <div className={style.key}>Block Number:</div>
        <div className={style.selectVal}>{blocknum}</div>
      </div>
      <div className={style.row}>
        <div className={style.key}>Block Size:</div>
        <div className={`${style.val}`}>{blksize}</div>
      </div>
      <div className={`${style.row} ${style.scrolly}`}>
        <div className={style.key}>Block Hash:</div>
        <div className={style.selectVal}>{blockhash}</div>
      </div>
      <div className={`${style.row} ${style.scrolly}`}>
        <div className={style.key}>Data Hash:</div>
        <div className={style.selectVal}>{datahash}</div>
      </div>
      <div className={`${style.row} ${style.scrolly}`}>
        <div className={style.key}>Previous Hash:</div>
        <div className={style.selectVal}>{prehash}</div>
      </div>
      <div className={`${style.row} ${style.scrolly}`}>
        <div className={style.key}>Transactions: {txcount}</div>
        <div className={style.val}>
          {txhash.map((t: string) => (
            <div key={t}>
              <NavLink className={style.link} to={`/txns/${t}`}>
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
