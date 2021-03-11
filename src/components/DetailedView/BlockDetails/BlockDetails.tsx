import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"

import axios from "../../../axios/axiosinst"

import { State } from "../../../utility/types"

interface Props {
  blocknum?: string | null
}

export const BlockDetails = (props: Props) => {
  const [blockData, setBlockData] = useState<any>(null)
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  let history = useHistory()

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  useEffect(() => {
    if (props.blocknum) {
      axios
        .get(`/block/transactions/${activeChannelHash}/${props.blocknum}`)
        .then((response) => {
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
      <div key={t}>
        <NavLink className="info-table-link monofont" to={`/txns/${t}`}>
          {t}
        </NavLink>
      </div>
    ))
    content = (
      <div className="">
        <div className="details-table-row">
          <div className="info-col info-key">Block Number:</div>
          <div className="info-col info-val selectable monofont">
            {blockData.blocknum}
          </div>
        </div>
        <div className="details-table-row">
          <div className="info-col info-key">Block Size:</div>
          <div className="info-col info-val monofont">{blockData.blksize}</div>
        </div>
        <div className="details-table-row scrolly">
          <div className="info-col info-key">Block Hash:</div>
          <div className="info-col info-val selectable monofont">
            {blockData.blockhash}
          </div>
        </div>
        <div className="details-table-row scrolly">
          <div className="info-col info-key">Data Hash:</div>
          <div className="info-col info-val selectable monofont">
            {blockData.datahash}
          </div>
        </div>
        <div className="details-table-row scrolly">
          <div className="info-col info-key">Previous Hash:</div>
          <div className="info-col info-val selectable monofont">
            {blockData.prehash}
          </div>
        </div>
        <div className="details-table-row scrolly">
          <div className="info-col info-key">
            Transactions: {blockData.txcount}
          </div>
          <div className="info-col info-val">{txContent}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="details-table" id="block-details-table">
      <div className="details-table-header">
        <h2>Block Details</h2>
        <div className="details-table-links-box">
          <div
            className="details-table-header-link"
            id="table-back-link"
            onClick={() => history.goBack()}
          >
            <i className="fas fa-arrow-circle-left"></i>
          </div>
          <div className="details-table-header-link">
            <NavLink to="/" id="table-home-link">
              <i className="fas fa-home"></i>
            </NavLink>
          </div>
        </div>
      </div>
      {content}
    </div>
  )
}
