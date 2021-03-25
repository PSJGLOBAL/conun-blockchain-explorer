import { useState } from "react"
import { useHistory } from "react-router-dom"
import { BASEURL } from "../../utility/config.json"

import style from "./HeadBar.module.css"

import logo from "../../style/images/conun-logo.png"

const HeadBar = () => {
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
    <nav id={style.nav} className={show ? style.show : style.hide}>
      <div
        className={
          show
            ? `${style.container} ${style.show}`
            : `${style.container} ${style.hide}`
        }
      >
        <div>
          <img
            id="logo-home-link"
            className={style.logo}
            src={logo}
            alt="Conun Logo"
            onClick={() => {
              setShow(false)
              goHome()
            }}
          />
        </div>
        <div
          className={
            show ? `${style.menu} ${style.show}` : `${style.menu} ${style.hide}`
          }
        >
          <div className={style.link}>
            <span
              id="headbar-link-main"
              onClick={() => {
                setShow(false)
                goHome()
              }}
            >
              Main
            </span>
          </div>
          <div className={style.link}>
            {/* This link will point to /contracts, target=same, when that page is finished */}
            <a
              id="headbar-link-contracts"
              href="/contracts"
              onClick={() => {
                setShow(false)
              }}
            >
              Smart Contracts
            </a>
          </div>
          <div className={style.link}>
            <a
              id="headbar-link-docs"
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
          className={style.toggler}
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

export default HeadBar
