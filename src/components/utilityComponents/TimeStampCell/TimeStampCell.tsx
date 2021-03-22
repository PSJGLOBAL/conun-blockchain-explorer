import ReactTimeAgo from "react-time-ago"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"

TimeAgo.addLocale(en)

type Props = {
  time: string | number
  timeStyle: string
}

const TimeStampCell = ({ time, timeStyle }: Props) => {
  return (
    <div className={timeStyle === "mini" ? "time-cell" : "large-time-cell"}>
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
