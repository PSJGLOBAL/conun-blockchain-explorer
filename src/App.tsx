import { useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import * as actions from "./store/actions"

import axios from "./axios/axiosinst"

import Header from "./ui/Header/Header"
import { APIInterface } from "./components/API_Interface/APIInterface"

interface IObjectKeys {
  [key: string]: string | number
}

type State = {
  channelHash: string
  channelInfoData: IObjectKeys
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

  let hash = "Loading"

  if (channelHash !== "") {
    hash = channelHash
  }

  return (
    <div className="app">
      <Header />
      <div style={{ textAlign: "center" }}>{hash}</div>
      <APIInterface />
    </div>
  )
}
export default App
