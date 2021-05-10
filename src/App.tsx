import { Suspense, lazy } from "react"
import { Route, Switch } from "react-router-dom"

import WebSocketProvider from "./components/providers/WebSocketProvider"

import HeadBlock from "./ui/HeadBlock"
import HeadBar from "./ui/HeadBar"
import Footer from "./ui/Footer"
import Loading from "./components/Loading"

import MainPage from "./pages/MainPage"
import BlocksPage from "./pages/BlocksPage"
import TxnsPage from "./pages/TxnsPage"

const ContractsMain = lazy(
  () => import("./pages/Contracts") // Only works with default exports?
)
const WalletsMain = lazy(
  () => import("./pages/Wallets") // Only works with default exports?
)
const Disconnected = lazy(() => import("./pages/Disconnected"))
const ErrorBlock = lazy(() => import("./pages/ErrorPage/ErrorBlock"))
const DetailedViewSection = lazy(() => import("./pages/Details"))

function App() {
  return (
    <div className="app-container">
      {/* The websocket goes here so it only loads once */}
      <WebSocketProvider />

      <div className="app">
        <HeadBar />
        <HeadBlock />
        <Suspense fallback={<Loading />}>
          <Switch>
            {/* DetailedViewSection handles both blocks/txns routes */}
            <Route path={["/blocks/:detail_id", "/txns/:detail_id"]}>
              <DetailedViewSection />
            </Route>

            <Route path={"/error"}>
              <ErrorBlock />
            </Route>

            <Route path="/contracts">
              <ContractsMain />
            </Route>

            <Route path="/wallets">
              <WalletsMain />
            </Route>

            <Route path="/disconnected">
              <Disconnected />
            </Route>

            <Route path="/blocks">
              <BlocksPage />
            </Route>

            <Route path="/txns/">
              <TxnsPage />
            </Route>

            <Route>
              <MainPage />
            </Route>
          </Switch>
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}
export default App
