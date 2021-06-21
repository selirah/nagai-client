import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { configureStore } from 'redux/store'

declare global {
  interface Window {
    INITIAL_REDUX_STATE: any
  }
}

const initialState = window.INITIAL_REDUX_STATE

export const { store, persistor } = configureStore(initialState)

ReactDOM.render(
  <React.StrictMode>
    <App store={store} persistor={persistor} />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
