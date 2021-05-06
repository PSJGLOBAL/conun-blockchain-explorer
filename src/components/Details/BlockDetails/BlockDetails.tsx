import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import DetailsTableHeader from "../DetailsTableHeader/DetailsTableHeader"
import BlockDetailsTable from "../BlockDetailsTable/BlockDetailsTable"
import DetailsSkeleton from "../../../ui/Skeletos/DetailsSkeleton/DetailsSkeleton"
import DuplicateSkeleton from "../../../ui/Skeletos/DuplicateSkeleton/DuplicateSkeleton"

import style from "../Details.module.css"

import axios from "../../../axios/axiosinst"

import { logger } from "../../../utility/functions"
import useChannelHash from "../../../hooks/useChannelHash"

interface Props {
  blocknum?: string | null
}

const BlockDetails = (props: Props) => {
  const [blockData, setBlockData] = useState<any>(null)
  const activeChannelHash = useChannelHash()

  let history = useHistory()

  // Force window to scroll up on load
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  // Do GET if provided a blocknum
  useEffect(() => {
    if (props.blocknum) {
      axios
        .get(`/block/transactions/${activeChannelHash}/${props.blocknum}`)
        .then((response) => {
          if (response.data.status === 400 || response.data.status === "400") {
            logger("BLOCK DETAILS: Bad Request: ", "error")
            history.push(`/error?type=bad_block&terms=${props.blocknum}`)
          } else {
            setBlockData(response.data.data)
          }
        })
        .catch((e) => {
          console.error(e)
          history.push(`/error?type=no_response&terms=search`)
        })
    }
  }, [activeChannelHash, props.blocknum, history])

  return (
    <div className={style.table} id="block-details-table">
      <DetailsTableHeader title={"Block Details"} />
      {blockData ? (
        <BlockDetailsTable
          blocknum={blockData.blocknum}
          blksize={blockData.blksize}
          blockhash={blockData.blockhash}
          datahash={blockData.datahash}
          prehash={blockData.prehash}
          txcount={blockData.txcount}
          txhash={blockData.txhash}
        />
      ) : (
        <DuplicateSkeleton howMany={6}>
          <DetailsSkeleton />
        </DuplicateSkeleton>
      )}
    </div>
  )
}

export default BlockDetails
