import {Link} from "react-router-dom"
import style from "../../../style/css/othertables.module.css"

const ToFromLink = ({dest}:{dest:string}) => {

  if (dest.startsWith("0x")){
    return <Link className={style.link} to={`/wallets/${dest}`}>{dest}</Link>
  } else {
    return <Link className={style.link} to={`/contracts/${dest}`}>{dest}</Link>
  }

}

export default ToFromLink