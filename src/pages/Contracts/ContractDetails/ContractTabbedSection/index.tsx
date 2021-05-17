import { useState, useEffect } from "react"

import TXNHistoryTable from "../../../../components/TXNHistoryTable"
import ContractCodeTab from "../ContractCodeTab"
import StatsTab from "../../../../components/StatsTab"
import TabMenu from "../../../../components/TabMenu"

import style from "./ContractTabbedSection.module.css"

type Props = {
  contractName: string | undefined
  contractVersions: number | undefined
  latestVersion: number | undefined
}

const ContractTabbedSection = ({
  contractName,
  contractVersions,
  latestVersion,
}: Props) => {
  const [activeTab, setActiveTab] = useState<string>("Transactions")

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  let displayedTab

  switch (activeTab) {
    case "Stats":
      displayedTab = <StatsTab role="contract" searchParam={contractName} />
      break
    case "Code":
      displayedTab = (
        <ContractCodeTab
          contractName={contractName}
          latestVersion={latestVersion}
          contractVersions={contractVersions && contractVersions}
        />
      )
      break
    case "Transactions":
    default:
      displayedTab = (
        <TXNHistoryTable param={contractName} dataRole="contract" />
      )
      break
  }

  return (
    <>
      <TabMenu
        tabs={["Transactions", "Code", "Stats"]}
        activeTab={activeTab}
        doChangeTab={setActiveTab}
      />
      <section className={style.tabBlock}>{displayedTab}</section>
    </>
  )
}

export default ContractTabbedSection
