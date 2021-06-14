import CopyIcon from "../../style/images/copy.svg"

import style from "./CopyButton.module.css"

function CopyButton({ stringToCopy }: { stringToCopy: string }) {
  return (
    <div className={style.CopyBtn}>
      <button
        className={style.Button}
        onClick={() => {
          navigator.clipboard.writeText(stringToCopy)
        }}
      >
        <img className={style.CopyIcon} src={CopyIcon} alt="" />
      </button>
    </div>
  )
}

export default CopyButton
