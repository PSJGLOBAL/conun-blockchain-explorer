import ReactTimeAgo from "react-time-ago"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"

TimeAgo.addLocale(en)

const TimeStampCell = ({ time }: { time: string | number }) => {
  return (
    <div className="time-cell">
      <span data-tip={time}>
        <ReactTimeAgo
          date={new Date(time)}
          locale="en-US"
          tooltip={false}
          timeStyle="mini"
        />
      </span>
    </div>
  )
}

export default TimeStampCell
