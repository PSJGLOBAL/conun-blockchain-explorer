import { useState } from "react"
import { useHistory } from "react-router-dom"
import { BASEURL } from "../../utility/config.json"

import "./HeadBar.css"
import logo from "../../style/images/conun-logo.png"

export const HeadBar = () => {
  const [show, setShow] = useState<boolean>(false)
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
    <nav id="nav" className={show ? "nav-show" : "nav-hide"}>
      <div
        className={show ? "nav-container nav-show" : "nav-container nav-hide"}
      >
        <div className="nav-logo-block">
          <img
            className="nav-logo"
            src={logo}
            alt="Conun Logo"
            onClick={() => {
              setShow(false)
              goHome()
            }}
          />
        </div>
        <div className={show ? "nav-menu nav-show" : "nav-menu nav-hide"}>
          <div className="nav-link">
            <span
              onClick={() => {
                setShow(false)
                goHome()
              }}
            >
              Main
            </span>
          </div>
          <div className="nav-link">
            <a
              href="/contracts"
              onClick={() => {
                setShow(false)
              }}
            >
              Smart Contracts
            </a>
          </div>
          <div className="nav-link">
            <a
              href={`${BASEURL}-docs/`}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                setShow(false)
              }}
            >
              Docs
            </a>
          </div>
        </div>
        <div
          className="nav-toggler"
          onClick={() => {
            setShow(!show)
          }}
        >
          {show ? (
            <i className="fas fa-ellipsis-h"></i>
          ) : (
            <i className="fas fa-ellipsis-v"></i>
          )}
        </div>
      </div>
    </nav>
  )
}
