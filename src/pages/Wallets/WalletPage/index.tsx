import { useParams } from "react-router-dom"

import WalletDetailTable from "../WalletDetailTable"
import WalletTabbedSection from "../WalletTabbedSection"

const WalletPage = () => {
  const { walletHash } = useParams<Record<string, string | undefined>>()

  return (
    <section className="section-single">
      {walletHash && (
        <>
          <WalletDetailTable walletHash={walletHash} />
          <WalletTabbedSection walletHash={walletHash} />
        </>
      )}
    </section>
  )
}

export default WalletPage
