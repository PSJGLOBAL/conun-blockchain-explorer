import HeadBlock from "./ui/HeadBlock/HeadBlock"

import WebSocketProvider from "./components/WebSocketProvider/WebSocketProvider"
import { InterfaceMain } from "./components/MainPage/InterfaceMain/InterfaceMain"
import { HeadBar } from "./ui/HeadBar/HeadBar"

function App() {
  return (
    <div className="app">
      <HeadBar />
      <HeadBlock />
      <WebSocketProvider />
      <InterfaceMain />
    </div>
  )
}
export default App
