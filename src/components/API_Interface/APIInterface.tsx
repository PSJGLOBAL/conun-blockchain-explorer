import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "../../axios/axiosinst"

import { setBlockActivityData } from "../../store/actions"

import { InfoBlock } from "../InfoBlock/InfoBlock"

import "./APIInterface.css"

interface IObjectKeys {
  [key: string]: string | number
}

type State = {
  channelHash: string
  blockActivityData: Array<IObjectKeys>
}

export const APIInterface = () => {
  const dispatch = useDispatch()
  const blockActivityData = useSelector(
    (state: State) => state.blockActivityData
  )

  const channelHash = useSelector((state: State) => state.channelHash)
  const [channelInfoData, setChannelInfoData] = useState<IObjectKeys | null>()

  useEffect(() => {
    if (channelHash !== "") {
      // Get Channel Info
      axios
        .get("/channels/info")
        .then((response) => {
          console.log("Channel Info: ", response.status, response.statusText)
          setChannelInfoData(response.data.channels[0])
        })
        .catch((e) => console.log(e))
      // Get Block Activity

      if (channelHash) {
        dispatch(setBlockActivityData(channelHash))
      }
    }
  }, [channelHash, dispatch])

  return (
    <main>
      {/* Channel Info */}
      <section className="section">
        <div className="section-title">Channel Info</div>
        {channelInfoData ? (
          <InfoBlock data={{ ...channelInfoData }} />
        ) : (
          <div className="loading-block">Loading Data</div>
        )}
      </section>
      {/* Block Activity */}
      <section className="section">
        <div className="section-title">Block Activity</div>
        <div className="section-block-scrollable">
          {blockActivityData ? (
            blockActivityData.map((i) => (
              <InfoBlock key={i.blockhash} data={{ ...i }} />
            ))
          ) : (
            <div className="loading-block">Loading Data</div>
          )}
        </div>
      </section>
      {/* Transaction Activity */}
      <section className="section">
        <div className="section-title">Transaction Activity</div>
        <div className="section-block-scrollable"></div>
      </section>
    </main>
  )
}
