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

import { State } from "../../utility/types"

export const APIInterface = () => {
  const dispatch = useDispatch()
  const channelInfo = useSelector((state: State) => state.basic.channelInfoData)
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)

  const blockActivityData = useSelector(
    (state: State) => state.block.blockActivityData
  )
  const txnActivityData = useSelector(
    (state: State) => state.txn.txnActivityData
  )
  const activeChannelHash = activeChannel.channel_genesis_hash

  // If the channel hash is loaded, get the rest of the data
  useEffect(() => {
    if (activeChannelHash && activeChannelHash !== "") {
      dispatch(setChannelInfo(activeChannelHash.toString())) // Get Channel Info
      dispatch(setBlockActivityData(activeChannelHash.toString())) // Get Block Activity - Redux Action performs API call
      dispatch(setTxnActivityData(activeChannelHash.toString())) // Get Block Activity - Redux Action performs API call
    }
  }, [activeChannelHash, dispatch])

  return (
    <main>
      <SiteSection
        title="Channel Info"
        loading={Object.keys(channelInfo).length === 0}
      >
        {/* Channel Info - Display channel name, total blocks, transactions etc*/}
        <InfoBlock data={{ ...channelInfo }} />
      </SiteSection>
      <SiteSection
        title="Block Activity"
        scrollable={true}
        loading={blockActivityData.length === 0}
      >
        {/* Block Activity - Table for each block made - shows hashes, created at, etc*/}
        {blockActivityData.map((i) => (
          <InfoBlock key={i.blockhash} data={{ ...i }} />
        ))}
      </SiteSection>
      <SiteSection
        title="Transaction Data"
        scrollable={true}
        loading={txnActivityData.length === 0}
      >
        {/* Block Activity - Table for each block made - shows hashes, created at, etc*/}
        {txnActivityData.map((i) => (
          <InfoBlock key={i.txhash} data={{ ...i }} />
        ))}
      </SiteSection>
    </main>
  )
}
