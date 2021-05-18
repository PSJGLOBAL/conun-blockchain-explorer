import TabMenu from "../TabMenu"
import style from "./MultiTabMenu.module.css"

type Props = {
  tabs: string[]
  activeTab: string
  doChangeTab: (x: string) => void
  subTabTrigger: string

  subTabs: string[]
  activeSubTab: string
  doChangeSubTab: (x: string) => void
}

const MultiTabMenu = ({
  tabs,
  activeTab,
  doChangeTab,
  subTabTrigger,
  subTabs,
  activeSubTab,
  doChangeSubTab,
}: Props) => {
  return (
    <div className={style.tabMenu}>
      {tabs.map((t) => {
        return (
          <div
            key={t}
            className={activeTab === t ? style.activeTab : style.tab}
            onClick={() => doChangeTab(t)}
          >
            {t}
          </div>
        )
      })}
      {activeTab === subTabTrigger && (
        <TabMenu
          tabs={subTabs}
          activeTab={activeSubTab}
          doChangeTab={doChangeSubTab}
        />
      )}
    </div>
  )
}

export default MultiTabMenu
