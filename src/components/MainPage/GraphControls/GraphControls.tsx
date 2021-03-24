import style from "./GraphControls.module.css"

type Props = {
  clickHandler: (x: string) => void
  active: string
}

const GraphControls = (props: Props) => {
  const { clickHandler, active } = props

  return (
    <div className={style.table}>
      <div
        className={
          active === "txn-min"
            ? `${style.tab} ${style.active}`
            : `${style.tab}`
        }
        id="graph-mode-txn-min"
        onClick={() => clickHandler("txn-min")}
      >
        Tx/Min
      </div>
      <div
        className={
          active === "txn-hour"
          ? `${style.tab} ${style.active}`
          : `${style.tab}`
        }
        id="graph-mode-txn-hour"
        onClick={() => clickHandler("txn-hour")}
      >
        Tx/Hour
      </div>
      <div
        className={
          active === "block-min"
          ? `${style.tab} ${style.active}`
          : `${style.tab}`
        }
        id="graph-mode-block-min"
        onClick={() => clickHandler("block-min")}
      >
        Blocks/Min
      </div>
      <div
        className={
          active === "block-hour"
          ? `${style.tab} ${style.active}`
          : `${style.tab}`
        }
        id="graph-mode-block-hour"
        onClick={() => clickHandler("block-hour")}
      >
        Blocks/Hour
      </div>
    </div>
  )
}

export default GraphControls
