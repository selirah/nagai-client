import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Store } from 'redux'
import { ApplicationState } from 'redux/root-reducer'
import Router from 'router'
import { useLoadScript } from '@react-google-maps/api'
interface AppProps {
  store: Store<ApplicationState>
  persistor: any
}

const libraries: any = ['places']

const App: React.FC<AppProps> = ({ store, persistor }) => {
  // LOAD GOOGLE MAPS API
  const { isLoaded } = useLoadScript({
    id: 'google-map',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API
      ? process.env.REACT_APP_GOOGLE_API
      : 'AIzaSyDJ3KpBV-DC8VZesXZEerJE457O-HygqXM',
    libraries
  })

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {isLoaded ? <Router /> : null}
      </PersistGate>
    </Provider>
  )
}

export default App
