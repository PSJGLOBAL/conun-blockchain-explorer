import ReactTimeAgo from "react-time-ago"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"

import tableStyle from "../../style/css/othertables.module.css"

TimeAgo.addLocale(en)

type Props = {
  time: string | number
  timeStyle: string
  elaborate?: boolean
}

const TimeStampCell = ({ time, timeStyle, elaborate }: Props) => {
  const dateObj = new Date(time)

  let timecellSize
  if (elaborate) {
    timecellSize = tableStyle.superTime
  } else if (timeStyle === "mini") {
    timecellSize = tableStyle.time
  } else {
    timecellSize = tableStyle.largeTime
  }

  return (
    <div
      className={timecellSize}
      data-tip="transaction hash"
      data-for="table-tips"
    >
      <span data-tip={time}>
        <ReactTimeAgo
          date={dateObj}
          locale="en-US"
          tooltip={false}
          timeStyle={timeStyle}
        />
      </span>
      {elaborate && <span>({dateObj.toUTCString()})</span>}
    </div>
  )
}

export default TimeStampCell
