import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts"
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
      datetime: format(new Date(i.datetime.toString()), "kk:mm"),
    }
  })

  return (
    <AreaChart width={580} height={240} data={timeAgoData}>
      <CartesianGrid width={560} height={200} />
      <XAxis dataKey="datetime" interval="preserveStartEnd" />
      <YAxis dataKey="count" />
      <Area
        type="monotone"
        dataKey="count"
        fill="#ffa7ac"
        stroke="#ee6259"
        baseLine={0}
        dot={true}
      />
    </AreaChart>
  )
}
