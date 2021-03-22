import { useParams, useLocation } from "react-router-dom"
import BlockDetails from "../../components/Details/BlockDetails/BlockDetails"
import TransactionDetails from "../../components/Details/TransactionDetails/TransactionDetails"

import "./Details.css"

export const DetailedViewSection = () => {
  const { pathname } = useLocation()
  const { detail_id } = useParams<Record<string, string | undefined>>()

  let internalComponent = null

  if (pathname.startsWith("/blocks/")) {
    internalComponent = <BlockDetails blocknum={detail_id} />
  } else if (pathname.startsWith("/txns/")) {
    internalComponent = <TransactionDetails txnID={detail_id} />
  }

  return (
    <div className="section-block section-full">
      <section className="section-centered">{internalComponent}</section>
    </div>
  )
}
