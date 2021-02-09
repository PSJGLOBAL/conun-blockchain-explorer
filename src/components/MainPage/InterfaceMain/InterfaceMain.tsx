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
      <div className="splitcolumns">
        <Route path="/" exact component={WebSocketProvider} />
        <Route path={["/", "/blocks"]} exact component={BlockActivitySection} />
        <Route path={["/", "/txns"]} exact component={TxnActivitySection} />
      </div>
    </main>
  )
}
