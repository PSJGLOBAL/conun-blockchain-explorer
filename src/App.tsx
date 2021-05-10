import { Suspense, lazy } from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import WebSocketProvider from "./components/providers/WebSocketProvider"

import HeadBlock from "./ui/HeadBlock"
import HeadBar from "./ui/HeadBar"
import Footer from "./ui/Footer"
import Loading from "./components/Loading"

import MainPage from "./pages/MainPage"
import { DetailedViewSection } from "./pages/Details"
import Disconnected from "./pages/Disconnected"
import ErrorBlock from "./pages/ErrorPage/ErrorBlock"
import BlocksPage from "./pages/BlocksPage"
import TxnsPage from "./pages/TxnsPage"

const ContractsMain = lazy(
  () => import("./pages/Contracts") // Only works with default exports?
)
const WalletsMain = lazy(
  () => import("./pages/Wallets") // Only works with default exports?
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
          {/* <Route path="/blocks/" exact=/> */}
          <Route path={"/error"} component={ErrorBlock} />
          <Route path="/contracts">
            <Suspense fallback={<Loading />}>
              <ContractsMain />
            </Suspense>
          </Route>
          <Route path="/wallets">
            <Suspense fallback={<Loading />}>
              <WalletsMain />
            </Suspense>
          </Route>

          <Route path="/disconnected" component={Disconnected} />
          <Route path="/blocks/" component={BlocksPage} />
          <Route path="/txns/" component={TxnsPage} />
          <Route path="/" component={MainPage} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  )
}
export default App
