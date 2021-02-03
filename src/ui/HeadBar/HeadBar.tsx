import "./HeadBar.css"
import logo from "../../style/images/conun-logo.svg"

export const HeadBar = () => {
  return (
    <nav id="nav">
      <div id="nav-block">
        <img className="nav-logo" src={logo} alt="Conun Logo" />
      </div>
    </nav>
  )
}
