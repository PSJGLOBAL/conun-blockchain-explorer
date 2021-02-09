import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import axios from "../../../axios/axiosinst"

import { State } from "../../../utility/types"

interface Props {
  blocknum?: string | null
}

export const BlockDetails = (props: Props) => {
  const [blockData, setBlockData] = useState<any>(null)
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  useEffect(() => {
    if (props.blocknum) {
      axios
        .get(`/block/transactions/${activeChannelHash}/${props.blocknum}`)
        .then((response) => {
          console.log("BLOCK MODAL: Data: ", response.data.data)
          setBlockData(response.data.data)
        })
        .catch((e) => console.error(e))
    }
  }, [activeChannelHash, props.blocknum])

  let content = (
    <div className="details-table-row">
      <div className="info-col info-key">Error:</div>
      <div className="info-col info-val">No data was found</div>
    </div>
  )

  if (blockData) {
    const txContent = blockData.txhash.map((t: string) => (
      <div>
        <NavLink className="info-table-link" to={`/txns/${t}`}>
          {t}
        </NavLink>
      </div>
    ))
    content = (
      <>
        <div className="details-table-row">
          <div className="info-col info-key">Block Number:</div>
          <div className="info-col info-val">{blockData.blocknum}</div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Block Number:</div>
          <div className="info-col info-val">{blockData.blksize}</div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Block Hash:</div>
          <div className="info-col info-val">{blockData.blockhash}</div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Data Hash:</div>
          <div className="info-col info-val">{blockData.datahash}</div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Previous Hash:</div>
          <div className="info-col info-val">{blockData.prehash}</div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">
            Transactions: {blockData.txcount}
          </div>
          <div className="info-col info-val">{txContent}</div>
        </div>
      </>
    )
  }

  return (
    <div className="details-table">
      <div className="details-table-header">
        <h2>Block Details</h2>
        <div className="details-table-header-link">
          <NavLink to="/">
            <i className="fas fa-undo"></i>
          </NavLink>
        </div>
      </div>
      {content}
    </div>
  )
}
