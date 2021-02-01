import { AreaChart, Area } from "recharts"

export const TheGraph = () => {
  const data = [
    { name: "Page A", uv: 300, pv: 100, amt: 100 },
    { name: "Page A", uv: 200, pv: 0, amt: 300 },
    { name: "Page A", uv: 900, pv: 700, amt: 100 },
    { name: "Page A", uv: 900, pv: 700, amt: 100 },
    { name: "Page A", uv: 2500, pv: 2300, amt: 100 },
    { name: "Page A", uv: 300, pv: 100, amt: 100 },
    { name: "Page A", uv: 200, pv: 0, amt: 100 },
  ]

  return (
    <AreaChart width={640} height={120} data={data}>
      <Area
        type="monotone"
        dataKey="uv"
        fill="#ffa7ac"
        stroke="#ee6259"
        dot={true}
      />
    </AreaChart>
  )
}
