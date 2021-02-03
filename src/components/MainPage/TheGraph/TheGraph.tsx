import { AreaChart, Area, CartesianGrid } from "recharts"
import { ObjectType } from "../../../utility/types"

type Props = {
  data: Array<ObjectType>
}

export const TheGraph = (props: Props) => {
  const { data } = props
  console.log(data)

  return (
    <AreaChart width={640} height={120} data={data}>
      <CartesianGrid width={630} height={110} />
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
