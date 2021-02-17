import { Route } from "react-router-dom"

import WebSocketProvider from "../../WebSocketProvider/WebSocketProvider"

import { StatsBlock } from "../../../containers/StatsBlock/Statsblock"
import { BlockActivitySection } from "../../../containers/BlockActivitySection/BlockActivitySection"
import { TxnActivitySection } from "../../../containers/TxnActivitySection/TxnActivitySection"

import "./InterfaceMain.css"

export const InterfaceMain = () => {
  return (
    <main>
      <StatsBlock />
      {/* <Route path="/" exact component={WebSocketProvider} /> */}
      <WebSocketProvider />
      <div className="splitcolumns">
        <Route
          path={"/"}
          exact
          render={() => {
            return (
              <>
                <BlockActivitySection />
                <TxnActivitySection />
              </>
            )
          }}
        />
        <Route path={"/blocks"} exact component={BlockActivitySection} />
        <Route path={"/txns"} exact component={TxnActivitySection} />
      </div>
    </main>
  )
}
