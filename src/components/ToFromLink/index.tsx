import { Link } from "react-router-dom"
import { multiclass } from "../../utility/functions"

import style from "../../style/css/othertables.module.css"

const ToFromLink = ({ dest, inner }: { dest: string; inner: string }) => {
  if (dest === "0x0") {
    return <div className={multiclass("to-from-cell")}>{inner}</div>
  }

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
        to={`/contracts/${dest.toLowerCase()}`}
      >
        {inner}
      </Link>
    )
  }
}

export default ToFromLink
