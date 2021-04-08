import { Link } from "react-router-dom"
import { multiclass } from "../../../utility/functions"

import style from "../../../style/css/othertables.module.css"

const ToFromLink = ({ dest, inner }: { dest: string; inner: string }) => {
  if (dest.startsWith("0x")) {
    return (
      <Link
        className={multiclass(style.link, "to-from-cell")}
        to={`/wallets/${dest}`}
      >
        {inner}
      </Link>
    )
  } else {
    return (
      <Link
        className={multiclass(style.link, "to-from-cell")}
        to={`/contracts/${dest}`}
      >
        {inner}
      </Link>
    )
  }
}

export default ToFromLink
