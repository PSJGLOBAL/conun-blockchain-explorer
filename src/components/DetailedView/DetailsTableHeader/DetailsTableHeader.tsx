import { NavLink, useHistory } from "react-router-dom"

type Props = {
  title: string
}

const DetailsTableHeader = ({ title }: Props) => {
  const history = useHistory()

  return (
    <div className="details-table-header">
      <h2>{title}</h2>
      <div className="details-table-links-box">
        <div
          className="details-table-header-link"
          id="table-back-link"
          onClick={() => history.goBack()}
        >
          <i className="fas fa-arrow-circle-left"></i>
        </div>
        <div className="details-table-header-link">
          <NavLink to="/" id="table-home-link">
            <i className="fas fa-home"></i>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default DetailsTableHeader
