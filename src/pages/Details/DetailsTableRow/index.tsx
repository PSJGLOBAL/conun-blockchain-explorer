import React from "react"
import CopyButton from "../../../components/CopyButton"
import style from "../Details.module.css"

type Props = {
  keyCell: string
  value?: string | number
  scroll?: boolean
  copy?: boolean
  children?: React.ReactNode | Array<React.ReactNode>
}

const DetailsTableRow = ({ keyCell, value, scroll, copy, children }: Props) => {
  let rowStyle = style.row
  if (scroll) {
    rowStyle = `${style.row} ${style.scrolly}`
  }

  return (
    <div className={rowStyle}>
      <div className={style.key}>{keyCell}</div>
      <div className={style.val}>{children ? children : value}</div>
      {copy && value && (
        <div className={style.copy}>
          <CopyButton stringToCopy={value.toString()} />
        </div>
      )}
    </div>
  )
}

export default DetailsTableRow
