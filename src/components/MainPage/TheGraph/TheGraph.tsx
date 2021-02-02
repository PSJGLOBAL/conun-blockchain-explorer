import { AreaChart, Area } from "recharts"
import { ObjectType } from "../../../utility/types"

type Props = {
  data: Array<ObjectType>
}

export const TheGraph = (props: Props) => {
  const { data } = props

  return (
    <AreaChart width={640} height={120} data={data}>
      <Area
        type="monotone"
        dataKey="count"
        xAxisId="datetime"
        yAxisId="count"
        fill="#ffa7ac"
        stroke="#ee6259"
        dot={true}
      />
    </AreaChart>
  )
}
