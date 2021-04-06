import { useState, useEffect } from "react"

import TXNHistoryTable from "../../../TXNHistoryTable/TXNHistoryTable"
import ContractCodeTab from "../ContractCodeTab/ContractCodeTab"
import TabMenu from "../../../TabMenu/TabMenu"

import style from "./ContractTabbedSection.module.css"

type Props = {
  contractName: string | undefined
}

const ContractTabbedSection = ({ contractName }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("Transactions")

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  let displayedTab

  switch (activeTab) {
    case "Code":
      displayedTab = <ContractCodeTab />
      break
    case "Transactions":
    default:
      displayedTab = <TXNHistoryTable param={contractName} dataRole="contract" />
      break
  }

  // I will remove "Code" from TabMenu while code is not implemented
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
