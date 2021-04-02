import { Link } from "react-router-dom"
import Identicon from "react-identicons"

import style from "./IdenticonLink.module.css"

const IdenticonLink = ({ destination }: { destination: string }) => {
  return (
    <div className={style.center}>
      <Link to={destination}>
        <div>
          <Identicon size={15} string={destination} />
        </div>
      </Link>
    </div>
  )
}

export default IdenticonLink
