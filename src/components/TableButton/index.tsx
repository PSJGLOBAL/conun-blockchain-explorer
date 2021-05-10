import { NavLink } from "react-router-dom"

type Props = {
  fullPage: boolean
  destination: string
  htmlID: string
  altLabel: string
}

const TableButton = ({ fullPage, destination, htmlID, altLabel }: Props) => {
  return (
    <div>
      {fullPage ? (
        <NavLink className="section-table-link" id={`${htmlID}-home`} to={"/"}>
          Back To Home
        </NavLink>
      ) : (
        <NavLink
          className="section-table-link"
          id={`${htmlID}-more`}
          to={destination}
        >
          {altLabel}
        </NavLink>
      )}
    </div>
  )
}

export default TableButton
