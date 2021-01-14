import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"

//Redux imports
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import mainReducer from "./store/reducers/reducer"

import thunk from "redux-thunk"

// Component Imports
import App from "./App"

// CSS
import "./style/global.css"

// const rootReducer =

const store = createStore(mainReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
)

reportWebVitals()
