import "./GraphControls.css"

type Props = {
  clickHandler: (x: string) => void
  active: string
}

export const GraphControls = (props: Props) => {
  const { clickHandler, active } = props

  return (
    <div className="graph-controls-table">
      <div
        className={
          active === "txn-min"
            ? "graph-controls-tab graph-controls-active"
            : "graph-controls-tab"
        }
        id="graph-mode-txn-min"
        onClick={() => clickHandler("txn-min")}
      >
        Tx/Min
      </div>
      <div
        className={
          active === "txn-hour"
            ? "graph-controls-tab graph-controls-active"
            : "graph-controls-tab"
        }
        id="graph-mode-txn-hour"
        onClick={() => clickHandler("txn-hour")}
      >
        Tx/Hour
      </div>
      <div
        className={
          active === "block-min"
            ? "graph-controls-tab graph-controls-active"
            : "graph-controls-tab"
        }
        id="graph-mode-block-min"
        onClick={() => clickHandler("block-min")}
      >
        Blocks/Min
      </div>
      <div
        className={
          active === "block-hour"
            ? "graph-controls-tab graph-controls-active"
            : "graph-controls-tab"
        }
        id="graph-mode-block-hour"
        onClick={() => clickHandler("block-hour")}
      >
        Blocks/Hour
      </div>
    </div>
  )
}
