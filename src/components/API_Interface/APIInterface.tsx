import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// import axios from "../../axios/axiosinst"

import {
  setBlockActivityData,
  setTxnActivityData,
  setChannelInfo,
} from "../../store/actions"

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
  txnActivityData: Array<IObjectKeys>
}

export const APIInterface = () => {
  const dispatch = useDispatch()
  const channelInfo = useSelector((state: State) => state.channelInfoData)
  const channelHash = useSelector((state: State) => state.channelHash)
  const blockActivityData = useSelector(
    (state: State) => state.blockActivityData
  )
  const txnActivityData = useSelector((state: State) => state.txnActivityData)

  // If the channel hash is loaded, get the rest of the data
  useEffect(() => {
    if (channelHash !== "") {
      dispatch(setChannelInfo(channelHash)) // Get Channel Info
      dispatch(setBlockActivityData(channelHash)) // Get Block Activity - Redux Action performs API call
      dispatch(setTxnActivityData(channelHash)) // Get Block Activity - Redux Action performs API call
    }
  }, [channelHash, dispatch])

  return (
    <main>
      <SiteSection title="Channel Info" loading={channelInfo === {}}>
        {/* Channel Info - Display channel name, total blocks, transactions etc*/}
        <InfoBlock data={{ ...channelInfo }} />
      </SiteSection>
      <SiteSection
        title="Block Activity"
        scrollable={true}
        loading={blockActivityData === []}
      >
        {/* Block Activity - Table for each block made - shows hashes, created at, etc*/}
        {blockActivityData.map((i) => (
          <InfoBlock key={i.blockhash} data={{ ...i }} />
        ))}
      </SiteSection>
      <SiteSection title="Transaction Data" scrollable={true}>
        {/* Block Activity - Table for each block made - shows hashes, created at, etc*/}
        {txnActivityData.map((i) => (
          <InfoBlock key={i.txhash} data={{ ...i }} />
        ))}
      </SiteSection>
    </main>
  )
}
