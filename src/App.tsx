import Header from "./ui/Header/Header"
import SelectChannel from "./components/SelectChannel/SelectChannel"
import WebSocketProvider from "./components/WebSocketProvider/WebSocketProvider"
import { APIInterface } from "./components/API_Interface/APIInterface"

function App() {
  return (
    <div className="app">
      <Header />
      <WebSocketProvider />
      <SelectChannel />
      <APIInterface />
    </div>
  )
}
export default App
