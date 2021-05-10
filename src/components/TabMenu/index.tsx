import style from "./TabMenu.module.css"

type Props = {
  tabs: Array<string>
  activeTab: string
  doChangeTab: (x: string) => void
}

const TabMenu = ({ tabs, activeTab, doChangeTab }: Props) => {
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
    </div>
  )
}

export default TabMenu
