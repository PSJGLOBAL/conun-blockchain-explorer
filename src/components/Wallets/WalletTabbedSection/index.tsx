import { useState, useEffect } from "react"

// import ContractHistoryTable from "../ContractHistoryTable/ContractHistoryTable"
import TXNHistoryTable from "../../TXNHistoryTable"

import TabMenu from "../../TabMenu"

const WalletTabbedSection = ({ walletHash }: { walletHash: string }) => {
  const [activeTab, setActiveTab] = useState<string>("Transactions")

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  // I put this code here in preparation for the stats part.
  let displayedTab

  switch (activeTab) {
    case "Transactions":
    default:
      displayedTab = <TXNHistoryTable param={walletHash} dataRole="wallet" />
  }

  return (
    <>
      <TabMenu
        tabs={["Transactions"]}
        activeTab={activeTab}
        doChangeTab={setActiveTab}
      />
      <section>{displayedTab}</section>
    </>
  )
}
export default WalletTabbedSection
