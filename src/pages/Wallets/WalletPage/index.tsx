import { useParams } from "react-router-dom"

import WalletDetailTable from "../WalletDetailTable"
import TabbedPage from "../../../components/TabbedPage"
import StatsTab from "../../../components/StatsTab"
import TXNHistoryTable from "../../../components/TXNHistoryTable"

const WalletPage = () => {
  const { walletHash } = useParams<Record<string, string | undefined>>()

  const tabs = {
    Stats: <StatsTab role="wallet" searchParam={walletHash} />,
    Transactions: <TXNHistoryTable param={walletHash} dataRole="wallet" />,
  }

  return (
    <section className="section-single">
      {walletHash && (
        <>
          <WalletDetailTable walletHash={walletHash} />
          <TabbedPage tabTitles={["Transactions", "Stats"]} tabs={tabs} />
        </>
      )}
    </section>
  )
}

export default WalletPage
