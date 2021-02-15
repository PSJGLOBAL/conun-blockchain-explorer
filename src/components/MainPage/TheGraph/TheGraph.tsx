import {
  AreaChart,
  Area,
  CartesianGrid,
  CartesianAxis,
  XAxis,
  YAxis,
} from "recharts"
import { ObjectType } from "../../../utility/types"
import { format } from "date-fns"

type Props = {
  data: Array<ObjectType>
}

export const TheGraph = (props: Props) => {
  const { data } = props
  const timeAgoData = data.map((i) => {
    return {
      ...i,
      count: Number(i.count),
      datetime: format(new Date(i.datetime.toString()), "kk:mm"),
    }
  })

  return (
    <AreaChart width={580} height={240} data={timeAgoData}>
      <CartesianGrid width={560} height={200} />
      <CartesianAxis width={560} height={200} />
      <XAxis id="xaxis" dataKey="datetime" interval="preserveStartEnd" />
      <YAxis
        id="yaxis"
        type="number"
        dataKey="count"
        interval="preserveStartEnd"
      />
      <Area
        type="monotone"
        dataKey="count"
        fill="#ffa7ac"
        stroke="#ee6259"
        baseLine={0}
        dot={{ strokeWidth: 0, fill: "orange" }}
      />
    </AreaChart>
  )
}
