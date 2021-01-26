import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { ObjectType, State } from "../../utility/types"

interface Props {
  clickHandler: () => void
  blocknum: string
}

export const BlockModal = (props: Props) => {
  const [blockData, setBlockData] = useState<ObjectType>({})
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  useEffect(() => {
    axios
      .get(
        `http://192.168.100.105:8080/api/block/${activeChannelHash}/${props.blocknum}`
      )
      .then((response) => {
        setBlockData(response.data)
      })
      .catch((e) => console.error(e))
  }, [activeChannelHash, props.blocknum])

  let content = (
    <div className="info-row">
      <div className="info-col info-key">Error:</div>
      <div className="info-col info-val">No data was found</div>
    </div>
  )

  if (blockData) {
    content = (
      <>
        <div className="info-row">
          <div className="info-col info-key"></div>
          <div className="info-col info-val">
            <h4>Block Details</h4>
          </div>
        </div>
        <div className="info-row">
          <div className="info-col info-key">Block Number:</div>
          <div className="info-col info-val">{blockData.number}</div>
        </div>
        <div className="info-row">
          <div className="info-col info-key">Block Hash:</div>
          <div className="info-col info-val">
            {"This data is not yet available"}
          </div>
        </div>
        <div className="info-row">
          <div className="info-col info-key">Data Hash:</div>
          <div className="info-col info-val">{blockData.data_hash}</div>
        </div>
        <div className="info-row">
          <div className="info-col info-key">Previous Hash:</div>
          <div className="info-col info-val">{blockData.previous_hash}</div>
        </div>
        <div className="info-row">
          <div className="info-col info-key">Transactions:</div>
          <div className="info-col info-val">
            {"This data is not yet available"}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="modal modal-background" onClick={props.clickHandler}>
      <div className="modal modal-table info-table">{content}</div>
    </div>
  )
}
