import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Store } from 'redux'
import { ApplicationState } from 'redux/root-reducer'
import Router from 'router'

interface AppProps {
  store: Store<ApplicationState>
  persistor: any
}

const App: React.FC<AppProps> = ({ store, persistor }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router />
      </PersistGate>
    </Provider>
  )
}

export default App
