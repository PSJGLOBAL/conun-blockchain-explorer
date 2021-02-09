import { RouteComponentProps } from "react-router-dom"
import { BlockDetails } from "../BlockDetails/BlockDetails"
import { TransactionDetails } from "../TransactionDetails/TransactionDetails"

type Props = RouteComponentProps
interface Params {
  detail_id?: string
}

export const DetailedViewSection = (props: Props) => {
  const route = props.match.path
  const params: Params = props.match.params

  console.log(props.match)

  let internalComponent = null

  if (route.startsWith("/blocks/")) {
    internalComponent = <BlockDetails blocknum={params.detail_id} />
  } else if (route.startsWith("/txns/")) {
    internalComponent = <TransactionDetails txnID={params.detail_id} />
  }

  return <div className="section-block section-full">{internalComponent}</div>
}
