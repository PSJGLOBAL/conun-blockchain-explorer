import { Link } from "react-router-dom"
import Identicon from "react-identicons"

const IdenticonLink = ({ destination }: { destination: string }) => {
  return (
    <div className="identicon-cell hiding-cell">
      <Link to={destination}>
        <div>
          <Identicon size={15} string={destination} />
        </div>
      </Link>
    </div>
  )
}

export default IdenticonLink
