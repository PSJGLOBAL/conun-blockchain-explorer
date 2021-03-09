import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "../../../axios/axiosinst"
import { State } from "../../../utility/types"

import { Modal } from "../../../ui/Modal/Modal"

interface Props {
  clickHandler: () => void
  blocknum: string
}

export const BlockModal = (props: Props) => {
  const [blockData, setBlockData] = useState<any>(null)
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  useEffect(() => {
    axios
      .get(`/block/transactions/${activeChannelHash}/${props.blocknum}`)
      .then((response) => {
        // console.log("BLOCK MODAL: Data: ", response.data.data)
        setBlockData(response.data.data)
      })
      .catch((e) => console.error(e))
  }, [activeChannelHash, props.blocknum])

  let content = (
    <div className="modal-row">
      <div className="info-col info-key">Error:</div>
      <div className="info-col info-val">No data was found</div>
    </div>
  )

  if (blockData) {
    const txContent = blockData.txhash.map((t: string) => <div>{t}</div>)
    content = (
      <>
        <div className="modal-header">
          <h2>Block Details</h2>
        </div>
        <div className="modal-row">
          <div className="info-col info-key">Block Number:</div>
          <div className="info-col info-val">{blockData.blocknum}</div>
        </div>
        <div className="modal-row">
          <div className="info-col info-key">Block Number:</div>
          <div className="info-col info-val">{blockData.blksize}</div>
        </div>
        <div className="modal-row">
          <div className="info-col info-key">Block Hash:</div>
          <div className="info-col info-val">{blockData.blockhash}</div>
        </div>
        <div className="modal-row">
          <div className="info-col info-key">Data Hash:</div>
          <div className="info-col info-val">{blockData.datahash}</div>
        </div>
        <div className="modal-row">
          <div className="info-col info-key">Previous Hash:</div>
          <div className="info-col info-val">{blockData.prehash}</div>
        </div>
        <div className="modal-row">
          <div className="info-col info-key">
            Transactions: {blockData.txcount}
          </div>
          <div className="info-col info-val">{txContent}</div>
        </div>
      </>
    )
  }

  return <Modal onClose={props.clickHandler}>{content}</Modal>
}