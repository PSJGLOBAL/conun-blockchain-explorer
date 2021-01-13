import { useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"

import * as actions from "./store/actions"

import axios from "./axios/axiosinst"

import Header from "./ui/Header/Header"
import { APIInterface } from "./components/API_Interface/APIInterface"

type State = {
  channelHash: string
}

function App() {
  const dispatch = useDispatch()
  const channelHash = useSelector((state: State) => state.channelHash)

  useEffect(() => {
    axios.get("/curChannel").then((response) => {
      console.log(
        "Received channel hash: ",
        response.status,
        response.statusText
      )
      dispatch(actions.setChannelHash(response.data.currentChannel))
      console.log("Attempt set channel hash: ", response.data.currentChannel)
    })
  }, [dispatch])

  let test = "Loading"

  if (channelHash !== "") {
    test = channelHash
  }

  return (
    <div className="app">
      <Header />
      <div style={{ textAlign: "center" }}>{test}</div>
      <APIInterface />
    </div>
  )
}
export default App
