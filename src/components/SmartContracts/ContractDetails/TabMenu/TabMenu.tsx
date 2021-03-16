type Props = {
  activeTab: string
  doChangeTab: (x: string) => void
}

const TabMenu = ({ activeTab, doChangeTab }: Props) => {
  return (
    <div className="contract-tab-menu">
      <div
        className={activeTab === "description" ? "tab active-tab" : "tab"}
        onClick={() => {
          doChangeTab("description")
        }}
      >
        Description
      </div>
      <div
        className={activeTab === "code" ? "tab active-tab" : "tab"}
        onClick={() => {
          doChangeTab("code")
        }}
      >
        Code
      </div>
    </div>
  )
}

export default TabMenu
