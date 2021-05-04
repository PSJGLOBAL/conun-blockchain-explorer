import { Redirect, Route, Switch } from "react-router-dom"

import StatsBlock from "../../containers/StatsBlock/Statsblock"
import BlockActivitySection from "../../containers/BlockActivitySection/BlockActivitySection"
import TxnActivitySection from "../../containers/TxnActivitySection/TxnActivitySection"

const MainPage = () => {
  return (
    <main>
      <Switch>
        <Route path="/blocks/" exact>
          <div className="splitcolumns">
            <BlockActivitySection />
          </div>
        </Route>
        <Route path="/txns/" exact>
          <div className="splitcolumns">
            <TxnActivitySection />
          </div>
        </Route>
        <Route path="/" exact>
          <StatsBlock />
          <div className="splitcolumns">
            <BlockActivitySection />
            <TxnActivitySection />
          </div>
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </main>
  )
}

export default MainPage
