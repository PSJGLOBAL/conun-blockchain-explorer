import { ObjectType } from "../../utility/types"

interface Props {
  clickHandler: () => void
  data: ObjectType
}

export const BlockModal = (props: Props) => {
  const data = { ...props.data }
  const keys = Object.keys(data)

  const cells = keys.map((k: string) => {
    if (data[k] !== "") {
      return (
        <div className="info-row" key={k}>
          <div className="info-col info-key">{k}</div>
          <div className="info-col info-val">{data[k]}</div>
        </div>
      )
    }
    return null
  })

  return (
    <div className="modal modal-background" onClick={props.clickHandler}>
      <div className="modal modal-table info-table">{cells}</div>
    </div>
  )
}
