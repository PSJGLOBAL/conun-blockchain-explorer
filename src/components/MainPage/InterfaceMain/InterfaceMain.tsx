import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// import axios from "../../axios/axiosinst"

import {
  setBlockActivityData,
  setTxnActivityData,
  setChannelInfo,
  setChannelStats,
} from "../../../store/actions"

import WebSocketProvider from "../../WebSocketProvider/WebSocketProvider"
import { StatsBlock } from "../../../containers/StatsBlock/Statsblock"
import { BlockDataBlock } from "../BlockDataBlock/BlockDataBlock"
import { TxnDataBlock } from "../TxnDataBlock/TxnDataBlock"
import { SiteSection } from "../../../containers/SiteSection" // Bundle HTML5 section and title block

import "./InterfaceMain.css"

import { State } from "../../../utility/types"

export const InterfaceMain = () => {
  const dispatch = useDispatch()

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
      dispatch(setChannelInfo(activeChannel)) // Set Channel Info
      dispatch(setBlockActivityData(activeChannelHash.toString())) // Get Block Activity - Redux Action performs API call
      dispatch(setTxnActivityData(activeChannelHash.toString())) // Get Block Activity - Redux Action performs API call
      dispatch(setChannelStats(activeChannelHash.toString()))
    }
  }, [activeChannelHash, activeChannel, dispatch])

  /*

<SiteSection
        title="Channel Info"
        loading={Object.keys(channelInfo).length === 0}
      >
        <InfoBlock data={{ ...channelInfo }} />
      </SiteSection>

*/

  return (
    <main>
      <WebSocketProvider />
      <StatsBlock />
      <div className="splitcolumns">
        <SiteSection
          title="Recent Blocks"
          scrollable={true}
          loading={blockActivityData.length === 0}
        >
          <div className="info-table recent-block-header">
            <div className="table-header-cell"> </div>
            <div className="table-header-cell">Num.</div>
            <div className="table-header-cell">Hash</div>
            <div className="table-header-cell">Time</div>
            <div className="table-header-cell">Txns</div>
          </div>
          {/* Block Activity - Table for each block made - shows hashes, created at, etc*/}
          {blockActivityData.map((i) => (
            <BlockDataBlock key={i.blockhash} data={{ ...i }} />
          ))}
        </SiteSection>
        <SiteSection
          title="Recent Transactions"
          scrollable={true}
          loading={txnActivityData.length === 0}
        >
          <div className="info-table recent-txn-header">
            <div className="table-header-cell"> </div>
            <div className="table-header-cell">Contract</div>
            <div className="table-header-cell">Hash</div>
            <div className="table-header-cell">Time</div>
          </div>
          {/* Block Activity - Table for each block made - shows hashes, created at, etc*/}
          {txnActivityData.map((i) => (
            <TxnDataBlock key={i.txhash} data={{ ...i }} />
          ))}
        </SiteSection>
      </div>
    </main>
  )
}
