import "../../style/css/modal.css"

type Props = {
  children: React.ReactNode
  onClose: () => void
}

export const Modal = (props: Props) => {
  document.onkeydown = function (e) {
    if (e.key === "Escape") {
      props.onClose()
    }
  }

  return (
    <div
      className="modal modal-background"
      onClick={() => props.onClose()}
      onKeyDown={(e) => {
        console.log(e.key)
      }}
    >
      <div className="modal modal-table">{props.children}</div>
    </div>
  )
}
