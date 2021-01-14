import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// import axios from "../../axios/axiosinst"

import { setBlockActivityData, setChannelInfo } from "../../store/actions"

import { InfoBlock } from "../InfoBlock/InfoBlock"
import { SiteSection } from "../../containers/SiteSection" // Bundle HTML5 section and title block

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
  const channelInfo = useSelector((state: State) => state.channelInfoData)
  const channelHash = useSelector((state: State) => state.channelHash)
  const blockActivityData = useSelector(
    (state: State) => state.blockActivityData
  )

  // If the channel hash is loaded, get the rest of the data
  useEffect(() => {
    if (channelHash !== "") {
      dispatch(setChannelInfo(channelHash)) // Get Channel Info
      dispatch(setBlockActivityData(channelHash)) // Get Block Activity - Redux Action performs API call
    }
  }, [channelHash, dispatch])

  return (
    <main>
      <SiteSection title="Channel Info">
        {/* Channel Info - Display channel name, total blocks, transactions etc*/}
        {channelInfo ? (
          <InfoBlock data={{ ...channelInfo }} />
        ) : (
          <div className="loading-block">Loading Data</div>
        )}
      </SiteSection>
      <SiteSection title="Block Activity" scrollable={true}>
        {/* Block Activity - Table for each block made - shows hashes, created at, etc*/}
        {blockActivityData ? (
          blockActivityData.map((i) => (
            <InfoBlock key={i.blockhash} data={{ ...i }} />
          ))
        ) : (
          <div className="loading-block">Loading Data</div>
        )}
      </SiteSection>
      <SiteSection title="Transaction Data" scrollable={true}>
        {/* Transaction Activity  - Currently blank*/}
        <div>Not Yet Added</div>
      </SiteSection>
    </main>
  )
}
