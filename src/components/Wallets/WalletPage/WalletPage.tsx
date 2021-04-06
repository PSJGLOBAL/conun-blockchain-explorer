import { useParams } from "react-router-dom"

import WalletDetailTable from "../WalletDetailTable/WalletDetailTable"
import WalletTabbedSection from "../WalletTabbedSection/WalletTabbedSection"

const WalletPage = () => {
  const { walletHash } = useParams<Record<string, string | undefined>>()

  return (
    <div className="section-block section-single">
      {walletHash && (
        <>
          <WalletDetailTable walletHash={walletHash} />
          <WalletTabbedSection walletHash={walletHash} />
        </>
      )}
    </div>
  )
}

export default WalletPage
