import { NavLink } from "react-router-dom"

import style from "./Error.module.css"

type Props = {
  code: string | number
  title: string
  subtitle: string
  terms: string | null
  message: string
}

const ErrorMessage = ({ code, title, subtitle, terms, message }: Props) => {
  return (
    <div className="section-block section-full">
      <section className="section-centered">
        <div className="details-table">
          <div className={`details-table-header ${style.header}`}>
            <h2>Error: {title}</h2>
            <div className="details-table-links-box">
              <div className="details-table-header-link">
                <NavLink to="/">
                  <i className="fas fa-home"></i>
                </NavLink>
              </div>
            </div>
          </div>

          <div className={style.errorContainer}>
            <div className={style.message}>
              <div className={style.title}>{code}</div>
              <div className={style.subtitle}>
                {subtitle} <span className={style.highlight}>{terms}</span>
              </div>

              <div>{message}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ErrorMessage
