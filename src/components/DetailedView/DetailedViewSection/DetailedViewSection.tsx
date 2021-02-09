import { RouteComponentProps } from "react-router-dom"

type Props = RouteComponentProps
interface Params {
  detail_id?: string
}

export const DetailedViewSection = (props: Props) => {
  const route = props.match.path
  const params: Params = props.match.params
  let mode = null

  console.log(props.match)

  if (route.startsWith("/blocks/")) {
    mode = "BLOCTS"
  } else if (route.startsWith("/txns/")) {
    mode = "TRANTSACTIONDS"
  }

  return (
    <div className="section-block section-full">
      User attempts to load {mode} page: {route} with hash value
      {params.detail_id}
    </div>
  )
}
