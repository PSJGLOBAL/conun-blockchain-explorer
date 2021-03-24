import { Link } from "react-router-dom"
import Identicon from "react-identicons"

import tableStyle from "../../../style/css/table.module.css"

const IdenticonLink = ({ destination }: { destination: string }) => {
  return (
    <div className={`${tableStyle.identicon} ${tableStyle.hiding} `}>
      <Link to={destination}>
        <div>
          <Identicon size={15} string={destination} />
        </div>
      </Link>
    </div>
  )
}

export default IdenticonLink
