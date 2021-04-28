// import Gist from "react-gist"
import { useEffect, useState } from "react"
import ReactEmbedGist from "react-embed-gist"
import { useSelector } from "react-redux"

import axios from "../../../../axios/axiosinst"
import { logger } from "../../../../utility/functions"
import { State } from "../../../../utility/types"

import style from "./ContractCodeTab.module.css"

type Props = {
  contractName: string | undefined
  contractVersions: number | undefined
}

const GISTPREFIX = "Aziiiz/"

const ContractCodeTab = ({ contractName, contractVersions }: Props) => {
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash

  const [reqVersion] = useState<number | undefined>(contractVersions)
  const [gistID, setGistID] = useState<string>("")

  useEffect(() => {
    if (contractName && reqVersion) {
      axios
        .get(
          `/chaincode/gist-code/${activeChannelHash}/${contractName}/${reqVersion.toString()}`
        )
        .then((response) => {
          logger("Chaincode GIST: ", response.data)
          if (response.data.rows?.code_links) {
            setGistID(response.data.rows?.code_links)
          }
        })
    }
  }, [contractName, reqVersion, activeChannelHash])
  // const gistID = "Aziiiz/64e1d17da3cc8ec2af55ba056d136603"
  return (
    <div className={style.block}>
      {gistID ? (
        <ReactEmbedGist
          gist={GISTPREFIX + gistID}
          wrapperClass={style.gist}
          contentClass={style.sectio}
        />
      ) : (
        <div>No Code Data</div>
      )}
    </div>
  )
}

export default ContractCodeTab
