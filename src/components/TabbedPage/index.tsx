import { useState } from "react"

import TabMenu from "../TabMenu"

import style from "./TabbedPage.module.css"

type Props = {
  tabTitles: string[]
  tabs: {
    [key: string]: React.ReactNode
  }
}

function TabbedPage({ tabTitles, tabs }: Props) {
  const [activeTab, setActiveTab] = useState<string>(tabTitles[0])

  return (
    <>
      <TabMenu
        tabs={tabTitles}
        activeTab={activeTab}
        doChangeTab={setActiveTab}
      />
      <section className={style.tabBlock}>{tabs[activeTab]}</section>
    </>
  )
}

export default TabbedPage
