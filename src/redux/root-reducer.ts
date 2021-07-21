import { AnyAction, combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { ActionTypes, authReducer, AuthState } from './auth'
import { layoutReducer, LayoutState } from './layout'
import { navbarReducer, NavbarState } from './navbar'
import { manufacturersReducer, ManufacturerState } from './manufacturers'
import { categoriesReducer, CategoryState } from './categories'

export type ApplicationState = {
  auth: AuthState
  layout: LayoutState
  navbar: NavbarState
  manufacturers: ManufacturerState
  categories: CategoryState
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'layout', 'navbar', 'manufacturers', 'categories']
}

const appReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  navbar: navbarReducer,
  manufacturers: manufacturersReducer,
  categories: categoriesReducer
})

const rootReducer = (state?: ApplicationState, action?: AnyAction) => {
  if (action && action.type === ActionTypes.DESTROY_STATES) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action!)
}

export const persistingReducer = () =>
  persistReducer(persistConfig, rootReducer)
