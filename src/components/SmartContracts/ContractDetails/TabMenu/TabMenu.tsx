type Props = {
  tabs: Array<string>
  activeTab: string
  doChangeTab: (x: string) => void
}

const TabMenu = ({ tabs, activeTab, doChangeTab }: Props) => {
  return (
    <div className="contract-tab-menu">
      {tabs.map((t) => {
        return (
          <div
            key={t}
            className={activeTab === t ? "tab active-tab" : "tab"}
            onClick={() => {
              doChangeTab(t)
            }}
          >
            {t}
          </div>
        )
      })}
    </div>
  )
}

export default TabMenu
