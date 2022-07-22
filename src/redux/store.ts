import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ApplicationState, persistingReducer } from './root-reducer'
import { rootSaga } from './root-saga'
import thunk from 'redux-thunk'
import createDebounce from 'redux-debounced'

export function configureStore(initialState: ApplicationState) {
  const composeEnhancers = composeWithDevTools({})
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [thunk, createDebounce(), sagaMiddleware]

  const store = createStore(
    persistingReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  )
  sagaMiddleware.run(rootSaga)
  const persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore
