import HeadBlock from "./ui/HeadBlock/HeadBlock"
import { InterfaceMain } from "./components/MainPage/InterfaceMain/InterfaceMain"
import { Disconnected } from "./components/Disconnected/Disconnected"
import { HeadBar } from "./ui/HeadBar/HeadBar"

import { Route, Switch, Redirect } from "react-router-dom"

function App() {
  return (
    <div className="app">
      <HeadBar />
      <HeadBlock />
      <Switch>
        <Route path="/explorer" component={InterfaceMain} />
        <Route path="/disconnected" component={Disconnected} />
        <Redirect from="/" to="/explorer" />
      </Switch>
    </div>
  )
}
export default App
