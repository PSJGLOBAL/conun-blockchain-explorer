import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// import axios from "../../axios/axiosinst"

import { setBlockActivityData, setChannelInfo } from "../../store/actions"

import { InfoBlock } from "../InfoBlock/InfoBlock"

import "./APIInterface.css"

interface IObjectKeys {
  [key: string]: string | number
}

type State = {
  channelHash: string
  channelInfoData: IObjectKeys
  blockActivityData: Array<IObjectKeys>
}

export const APIInterface = () => {
  const dispatch = useDispatch()
  const blockActivityData = useSelector(
    (state: State) => state.blockActivityData
  )
  const channelInfo = useSelector((state: State) => state.channelInfoData)

  const channelHash = useSelector((state: State) => state.channelHash)
  // const [channelInfoData, setChannelInfoData] = useState<IObjectKeys | null>()

  useEffect(() => {
    if (channelHash !== "") {
      // Get Channel Info
      dispatch(setChannelInfo(channelHash))
      // Get Block Activity - Redux Action performs API call

      dispatch(setBlockActivityData(channelHash))
    }
  }, [channelHash, dispatch])

  return (
    <main>
      {/* Channel Info - Display channel name, total blocks, transactions etc*/}
      <section className="section">
        <div className="section-title">Channel Info</div>
        {channelInfo ? (
          <InfoBlock data={{ ...channelInfo }} />
        ) : (
          <div className="loading-block">Loading Data</div>
        )}
      </section>
      {/* Block Activity - Table for each block made - shows hashes, created at, etc*/}
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
      {/* Transaction Activity  - Currently blank*/}
      <section className="section">
        <div className="section-title">Transaction Activity</div>
        <div className="section-block-scrollable"></div>
      </section>
    </main>
  )
}
