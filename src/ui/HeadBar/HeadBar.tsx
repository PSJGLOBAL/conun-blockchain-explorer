import { useState } from "react"
import { NavLink } from "react-router-dom"
import { BASEURL } from "../../utility/config.json"

import style from "./HeadBar.module.css"

import logo from "../../style/images/conun-logo.png"

const HeadBar = () => {
  const [show, setShow] = useState<boolean>(false)

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
          <NavLink to="/" onClick={() => setShow(false)}>
            <img
              id="logo-home-link"
              className={style.logo}
              src={logo}
              alt="Conun Logo"
            />
          </NavLink>
        </div>
        <div
          className={
            show ? `${style.menu} ${style.show}` : `${style.menu} ${style.hide}`
          }
        >
          <div className={style.link}>
            <NavLink to="/" onClick={() => setShow(false)}>
              Main
            </NavLink>
          </div>
          <div className={style.link}>
            {/* This link will point to /contracts, target=same, when that page is finished */}
            <NavLink
              id="headbar-link-contracts"
              to="/contracts"
              onClick={() => setShow(false)}
            >
              Smart Contracts
            </NavLink>
          </div>
          <div className={style.link}>
            {/* Use NavLink when this becomes internal */}
            <a
              id="headbar-link-docs"
              href={`${BASEURL}-docs/`}
              target="_blank"
              rel="noreferrer"
              onClick={() => setShow(false)}
            >
              Docs
            </a>
          </div>
        </div>
        <div className={style.toggler} onClick={() => setShow(!show)}>
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
