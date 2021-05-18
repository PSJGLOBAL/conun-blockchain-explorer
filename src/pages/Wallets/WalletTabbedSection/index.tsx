import { useState, useEffect } from "react"

import TXNHistoryTable from "../../../components/TXNHistoryTable"
import TabMenu from "../../../components/TabMenu"
import StatsTab from "../../../components/StatsTab"

import style from "./WalletTabbedSection.module.css"

const WalletTabbedSection = ({ walletHash }: { walletHash: string }) => {
  const [activeTab, setActiveTab] = useState<string>("Transactions")

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  // I put this code here in preparation for the stats part.
  let displayedTab

  switch (activeTab) {
    case "Stats":
      displayedTab = <StatsTab role="wallet" searchParam={walletHash} />
      break
    case "Transactions":
    default:
      displayedTab = <TXNHistoryTable param={walletHash} dataRole="wallet" />
  }

  return (
    <>
      <TabMenu
        tabs={["Transactions", "Stats"]}
        activeTab={activeTab}
        doChangeTab={setActiveTab}
      />
      <section className={style.tabBlock}>{displayedTab}</section>
    </>
  )
}
export default WalletTabbedSection
