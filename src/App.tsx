import { Suspense, lazy } from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import WebSocketProvider from "./components/providers/WebSocketProvider/WebSocketProvider"

import HeadBlock from "./ui/HeadBlock/HeadBlock"
import HeadBar from "./ui/HeadBar/HeadBar"
import Footer from "./ui/Footer/Footer"
import Loading from "./components/Loading/Loading"

import MainPage from "./pages/MainPage/MainPage"
import { DetailedViewSection } from "./pages/Details/Details"
import Disconnected from "./components/Disconnected/Disconnected"
import ErrorBlock from "./components/ErrorPage/ErrorBlock/ErrorBlock"

const ContractsMain = lazy(
  () => import("./pages/Contracts/Contracts") // Only works with default exports?
)
const WalletsMain = lazy(
  () => import("./pages/Wallets/Wallets") // Only works with default exports?
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
