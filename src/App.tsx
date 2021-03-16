import { Suspense, lazy } from "react"
import { Route, Switch } from "react-router-dom"
import ReactTooltip from "react-tooltip"

import WebSocketProvider from "./components/WebSocketProvider/WebSocketProvider"

import HeadBlock from "./ui/HeadBlock/HeadBlock"
import { HeadBar } from "./ui/HeadBar/HeadBar"
import { Footer } from "./ui/Footer/Footer"
import Loading from "./components/Loading/Loading"

import { InterfaceMain } from "./components/MainPage/InterfaceMain/InterfaceMain"
import { DetailedViewSection } from "./components/DetailedView/DetailedViewSection/DetailedViewSection"
import { Disconnected } from "./components/Disconnected/Disconnected"
import { ErrorBlock } from "./components/ErrorPage/ErrorBlock/ErrorBlock"

const ContractsMain = lazy(
  () => import("./components/SmartContracts/ContractsMain/ContractsMain") // Only works with default exports?
)

function App() {
  return (
    <div className="app-container">
      {/* The websocket goes here so it only loads once */}
      <WebSocketProvider />
      <div className="app">
        <HeadBar />
        <HeadBlock />
        <Switch>
          {/* DetailedViewSection handles both blocks/txns routes */}
          <Route
            path={["/blocks/:detail_id", "/txns/:detail_id"]}
            component={DetailedViewSection}
          />
          <Route path={"/error"} component={ErrorBlock} />
          <Route
            path="/contracts"
            render={() => {
              return (
                <Suspense fallback={<Loading />}>
                  <ContractsMain />
                </Suspense>
              )
            }}
          />
          <Route path="/disconnected" component={Disconnected} />
          <Route path="/" component={InterfaceMain} />
        </Switch>
      </div>
      <Footer />
      <ReactTooltip backgroundColor="#e95654" />
    </div>
  )
}
export default App
