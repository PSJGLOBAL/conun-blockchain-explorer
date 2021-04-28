import { useState, useEffect } from "react"

import TXNHistoryTable from "../../../TXNHistoryTable/TXNHistoryTable"
import ContractCodeTab from "../ContractCodeTab/ContractCodeTab"
import TabMenu from "../../../TabMenu/TabMenu"

import style from "./ContractTabbedSection.module.css"

type Props = {
  contractName: string | undefined
  contractVersions: number | undefined
}

const ContractTabbedSection = ({ contractName, contractVersions }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("Transactions")

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  let displayedTab

  switch (activeTab) {
    case "Code":
      displayedTab = (
        <ContractCodeTab
          contractName={contractName}
          contractVersions={contractVersions && contractVersions - 1}
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
        tabs={["Transactions", "Code"]}
        activeTab={activeTab}
        doChangeTab={setActiveTab}
      />
      <section className={style.tabBlock}>{displayedTab}</section>
    </>
  )
}

export default ContractTabbedSection
