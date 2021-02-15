import { NavLink } from "react-router-dom"

import "./HeadBar.css"
import logo from "../../style/images/conun-logo.svg"

export const HeadBar = () => {
  return (
    <nav id="nav">
      <div id="nav-block">
        <NavLink to="/">
          <img className="nav-logo" src={logo} alt="Conun Logo" />
        </NavLink>
      </div>
    </nav>
  )
}
