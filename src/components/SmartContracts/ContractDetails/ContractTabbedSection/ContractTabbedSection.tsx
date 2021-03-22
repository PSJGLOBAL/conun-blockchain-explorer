import { useState, useEffect } from "react"

import ContractHistoryTable from "../ContractHistoryTable/ContractHistoryTable"
import ContractCodeTab from "../ContractCodeTab/ContractCodeTab"
import TabMenu from "../../../TabMenu/TabMenu"

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
      displayedTab = <ContractHistoryTable contractName={contractName} />
      break
  }

  // I will remove "Code" from TabMenu while code is not implemented
  return (
    <>
      <TabMenu
        tabs={["Transactions"]}
        activeTab={activeTab}
        doChangeTab={setActiveTab}
      />
      <section className="contract-tabbed-block">{displayedTab}</section>
    </>
  )
}

export default ContractTabbedSection
