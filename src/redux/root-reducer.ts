import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authReducer, AuthState } from './auth'
import { layoutReducer, LayoutState } from './layout'

export type ApplicationState = {
  auth: AuthState
  layout: LayoutState
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'layout']
}

export const persistingReducer = () =>
  persistReducer(
    persistConfig,
    combineReducers({
      auth: authReducer,
      layout: layoutReducer
    })
  )
