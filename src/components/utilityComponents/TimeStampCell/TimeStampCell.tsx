import ReactTimeAgo from "react-time-ago"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"

import tableStyle from "../../../style/css/table.module.css"

TimeAgo.addLocale(en)

type Props = {
  time: string | number
  timeStyle: string
}

const TimeStampCell = ({ time, timeStyle }: Props) => {
  return (
    <div
      className={timeStyle === "mini" ? tableStyle.time : tableStyle.largeTime}
    >
      <span data-tip={time}>
        <ReactTimeAgo
          date={new Date(time)}
          locale="en-US"
          tooltip={false}
          timeStyle={timeStyle}
        />
      </span>
    </div>
  )
}

export default TimeStampCell
