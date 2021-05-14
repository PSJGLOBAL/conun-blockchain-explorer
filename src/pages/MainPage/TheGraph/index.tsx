import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ObjectType } from "../../../utility/types"
import { format } from "date-fns"
import numeral from "numeral"

type Props = {
  data: Array<ObjectType>
  width : number | string
  minWidth: number | string
  height : number | string
}

const TheGraph = ({ data, width, minWidth, height } : Props) => {

  const timeAgoData = data.map((i) => {
    return {
      ...i,
      count: Number(i.count),
      datetime: format(new Date(i.datetime.toString()), "kk:mm"),
    }
  })

  return (
    <ResponsiveContainer width={width} minWidth={minWidth} height={height}>
      <AreaChart
        margin={{ top: 10, right: 0, bottom: 0, left: -10 }}
        data={timeAgoData}
      >
        <XAxis id="xaxis" dataKey="datetime" minTickGap={40} axisLine={false} />
        <YAxis
          id="yaxis"
          type="number"
          dataKey="count"
          interval="preserveStartEnd"
          axisLine={false}
          allowDecimals={false}
          tickFormatter={(n) => numeral(n).format("0a")}
        />
        <Area
          animationDuration={600}
          type="monotone"
          dataKey="count"
          stroke="#495867"
          fill="#74b3ce"
          baseLine={0}
          dot={{ strokeWidth: 0, fill: "#09bc8a" }}
        />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default TheGraph
