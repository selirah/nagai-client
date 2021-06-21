import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Store } from 'redux'
import { ApplicationState } from 'redux/root-reducer'
import FallbackSpinner from 'core/components/spinner/fallback'

interface AppProps {
  store: Store<ApplicationState>
  persistor: any
}

const App: React.FC<AppProps> = ({ store, persistor }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <h1>App</h1>
        <FallbackSpinner />
      </PersistGate>
    </Provider>
  )
}

export default App
