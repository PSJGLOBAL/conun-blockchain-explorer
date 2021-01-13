import { useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"

import * as actionTypes from "./store/actions"

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
      dispatch({
        type: actionTypes.SET_CHANNEL_HASH,
        payload: { hash: response.data.currentChannel },
      })
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
