import { truncate } from "../../../utility/functions"

type Props = {
  fullPage: boolean
  hash: string
  limit: number
}

const FlexHashCell = ({ fullPage, hash, limit }: Props) => {
  return (
    <span
      className={fullPage ? "result-hash-cell selectable" : "result-hash-cell"}
    >
      {fullPage ? truncate(hash, limit) : truncate(hash)}
    </span>
  )
}

export default FlexHashCell
