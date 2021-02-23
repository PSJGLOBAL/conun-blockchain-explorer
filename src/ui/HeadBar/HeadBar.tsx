import { useHistory } from "react-router-dom"
import { BASEURL } from "../../utility/config.json"

import "./HeadBar.css"
import logo from "../../style/images/conun-logo.svg"

export const HeadBar = () => {
  const history = useHistory()

  // This function prevents the user from going to the home page if they're already there
  // This is important because otherwise repeatedly clicking home messes up the websocket
  function goHome() {
    const location = history.location.pathname
    if (location !== "/") {
      history.push("/")
    }
  }

  return (
    <nav id="nav" className="textured-bkg">
      <div className="nav-container">
        <div className="nav-block">
          <img
            className="nav-logo"
            src={logo}
            alt="Conun Logo"
            onClick={goHome}
          />
        </div>
        {/* Temporary links until the real ones are made */}
        <div className="nav-block">
          <ul className="nav-link">
            <li>
              <span onClick={goHome}>Main</span>
            </li>
            <li>
              <span onClick={goHome}>Smart Contracts</span>
            </li>
            <li>
              <a href={`${BASEURL}-docs/`}>Docs</a>
            </li>
          </ul>
        </div>
        {/* This is the real block, but I need to use the goHome function while these pages don't exist */}
        {/* <div className="nav-block">
          <ul className="nav-link">
            <li>
              <a href="/">Main</a>
            </li>
            <li>
              <a href="/">Smart Contracts</a>
            </li>
            <li>
              <a href="/">Docs</a>
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  )
}
