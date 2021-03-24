import { NavLink, useHistory } from "react-router-dom"
import style from "./DetailsTableHeader.module.css"

type Props = {
  title: string
}

const DetailsTableHeader = ({ title }: Props) => {
  const history = useHistory()

  return (
    <div className={style.header}>
      <h2>{title}</h2>
      <div className={style.linkBox}>
        <div
          className={style.link}
          id="table-back-link"
          onClick={() => history.goBack()}
        >
          <i className="fas fa-arrow-circle-left"></i>
        </div>
        <div className={style.link}>
          <NavLink to="/" id="table-home-link">
            <i className="fas fa-home"></i>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default DetailsTableHeader
