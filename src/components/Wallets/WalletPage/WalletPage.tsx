import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import WalletDetailTable from "../WalletDetailTable/WalletDetailTable"
import WalletTabbedSection from "../WalletTabbedSection/WalletTabbedSection"

import { State, ObjectType } from "../../../utility/types"

const WalletPage = () => {
  const activeChannel = useSelector((state: State) => state.basic.activeChannel)
  const activeChannelHash = activeChannel.channel_genesis_hash
  const { walletHash } = useParams<Record<string, string | undefined>>()
  const [walletData, setWalletData] = useState<ObjectType | null>(null)

  console.log(walletHash)
  return (
    <div className="section-block section-single">
      {walletHash ? (
        <>
          <WalletDetailTable walletHash={walletHash} />
          <WalletTabbedSection walletHash={walletHash} />
        </>
      ) : (
        <div>NOAT</div>
      )}
    </div>
  )
}

export default WalletPage
