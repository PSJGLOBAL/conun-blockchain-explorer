import { Suspense, lazy } from "react"
import { Route, Switch } from "react-router-dom"

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
          <Route path="/" component={MainPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}
export default App
