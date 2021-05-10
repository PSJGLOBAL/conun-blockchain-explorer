
import React from "react"
import style from "../Details.module.css"

type Props = {

  keyCell:string
  value?:string | number
  scroll?:boolean
  select?:boolean
  children?:React.ReactNode | Array<React.ReactNode>

}

const DetailsTableRow = ({keyCell, value, scroll, select, children}:Props) => {

  let valStyle
  if (select) {
    valStyle = style.selectVal
  } else {
    valStyle = style.val
  }
  
  let rowStyle = style.row
  if (scroll) {
    rowStyle = `${style.row} ${style.scrolly}`

  }

  return <div className={rowStyle}>
    <div className={style.key}>{keyCell}</div>
    <div className={valStyle}>
      {children? children : value}
    </div>
  </div>

}


export default DetailsTableRow