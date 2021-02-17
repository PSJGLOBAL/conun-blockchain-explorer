import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"
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
    <AreaChart
      margin={{ top: 10, right: 0, bottom: 0, left: -10 }}
      width={620}
      height={260}
      data={timeAgoData}
    >
      <XAxis
        id="xaxis"
        dataKey="datetime"
        // interval="preserveStartEnd"
        minTickGap={40}
        axisLine={false}
      />
      <YAxis
        id="yaxis"
        type="number"
        dataKey="count"
        interval="preserveStartEnd"
        axisLine={false}
        allowDecimals={false}
        // tickLine={false}
      />
      <Area
        type="monotone"
        dataKey="count"
        stroke="#495867"
        fill="#74b3ce"
        baseLine={0}
        dot={{ strokeWidth: 0, fill: "#09bc8a" }}
      />
      <Tooltip />
    </AreaChart>
  )
}
