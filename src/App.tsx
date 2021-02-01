import HeadBlock from "./ui/HeadBlock/HeadBlock"

import WebSocketProvider from "./components/WebSocketProvider/WebSocketProvider"
import { APIInterface } from "./components/API_Interface/APIInterface"
import { HeadBar } from "./ui/HeadBar/HeadBar"

function App() {
  return (
    <div className="app">
      <HeadBar />
      <HeadBlock />
      <WebSocketProvider />
      {/* <SelectChannel /> */}
      <APIInterface />
    </div>
  )
}
export default App
