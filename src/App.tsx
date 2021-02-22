import HeadBlock from "./ui/HeadBlock/HeadBlock"
import { InterfaceMain } from "./components/MainPage/InterfaceMain/InterfaceMain"
import WebSocketProvider from "./components/WebSocketProvider/WebSocketProvider"
import { Disconnected } from "./components/Disconnected/Disconnected"
import { DetailedViewSection } from "./components/DetailedView/DetailedViewSection/DetailedViewSection"
import { HeadBar } from "./ui/HeadBar/HeadBar"
import { Footer } from "./ui/Footer/Footer"

import { Route, Switch } from "react-router-dom"
import { SearchError } from "./components/SearchError/SearchError"

function App() {
  return (
    <div className="app-container">
      {/* The websocket goes here so it only loads once */}
      <WebSocketProvider />
      <div className="app">
        <HeadBar />
        <HeadBlock />
        <Switch>
          <Route path="/disconnected" component={Disconnected} />
          {/* DetailedViewSection handles both blocks/txns routes */}
          <Route
            path={["/blocks/:detail_id", "/txns/:detail_id"]}
            component={DetailedViewSection}
          />
          <Route path={"/error"} component={SearchError} />
          <Route path="/" component={InterfaceMain} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}
export default App
