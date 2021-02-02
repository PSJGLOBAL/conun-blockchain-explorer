import HeadBlock from "./ui/HeadBlock/HeadBlock"
import { InterfaceMain } from "./components/MainPage/InterfaceMain/InterfaceMain"
import { Disconnected } from "./components/Disconnected/Disconnected"
import { HeadBar } from "./ui/HeadBar/HeadBar"

import { Route, Switch } from "react-router-dom"

function App() {
  return (
    <div className="app">
      <HeadBar />
      <HeadBlock />
      <Switch>
        <Route path="/disconnected" component={Disconnected} />
        <Route path="/" component={InterfaceMain} />
      </Switch>
    </div>
  )
}
export default App
