type Props = {
  children: React.ReactNode
  onClose: () => void
}

export const Modal = (props: Props) => {
  return (
    <div className="modal modal-background" onClick={() => props.onClose()}>
      <div className="modal modal-table">{props.children}</div>
    </div>
  )
}
