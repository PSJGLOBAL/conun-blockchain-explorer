import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"

import { BrowserRouter } from "react-router-dom"

//Redux imports
import { createStore, applyMiddleware, combineReducers } from "redux"
import { Provider } from "react-redux"
// import mainReducer from "./store/reducers/reducer"
import basicReducer from "./store/reducers/basicReducer"
import blockReducer from "./store/reducers/blockReducer"
import txnReducer from "./store/reducers/txnReducer"

import thunk from "redux-thunk"

// Component Imports
import App from "./App"
import { ChannelProvider } from "./components/MainPage/ChannelProvider/ChannelProvider"

// CSS
import "./style/css/global.css"

const rootReducer = combineReducers({
  basic: basicReducer,
  block: blockReducer,
  txn: txnReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      {/* Channel goes here so that loading the channel has higher priority than loading the app.*/}
      {/* It has no prop children functionality but works anyway? :S */}
      <ChannelProvider>
        <App />
      </ChannelProvider>
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
)

reportWebVitals()
