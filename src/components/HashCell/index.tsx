import { NavLink } from "react-router-dom"

import style from "../../style/css/maintables.module.css"

const HashCell = ({ hash, link }: { hash: string; link?: string | number }) => {
  if (link) {
    return (
      <div
        className={style.hash}
        data-tip="transaction hash"
        data-for="table-tips"
      >
        <NavLink to={link.toString()}>{hash}</NavLink>
      </div>
    )
  }
  return <div className={style.hash}>{hash}</div>
}

export default HashCell
