import { Route } from "react-router-dom"

import { StatsBlock } from "../../../containers/StatsBlock/Statsblock"
import { BlockActivitySection } from "../../../containers/BlockActivitySection/BlockActivitySection"
import { TxnActivitySection } from "../../../containers/TxnActivitySection/TxnActivitySection"

import "./InterfaceMain.css"

export const InterfaceMain = () => {
  return (
    <main>
      <Route path="/" exact component={StatsBlock} />
      <div className="splitcolumns">
        <Route path="/" exact>
          <BlockActivitySection />
          <TxnActivitySection />
        </Route>
        <Route path="/blocks" exact component={BlockActivitySection} />
        <Route path="/txns" exact component={TxnActivitySection} />
      </div>
    </main>
  )
}
