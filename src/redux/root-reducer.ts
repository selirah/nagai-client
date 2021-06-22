import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authReducer, AuthState } from './auth'
import { layoutReducer, LayoutState } from './layout'
import { navbarReducer, NavbarState } from './navbar'

export type ApplicationState = {
  auth: AuthState
  layout: LayoutState
  navbar: NavbarState
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'layout', 'navbar']
}

export const persistingReducer = () =>
  persistReducer(
    persistConfig,
    combineReducers({
      auth: authReducer,
      layout: layoutReducer,
      navbar: navbarReducer
    })
  )
