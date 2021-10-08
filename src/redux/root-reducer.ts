import { AnyAction, combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { ActionTypes, authReducer, AuthState } from './auth'
import { layoutReducer, LayoutState } from './layout'
import { navbarReducer, NavbarState } from './navbar'
import { manufacturersReducer, ManufacturerState } from './manufacturers'
import { categoriesReducer, CategoryState } from './categories'
import { productsReducer, ProductState } from './products'
import { stockReducer, StockState } from './stock'
import { territoryReducer, TerritoryState } from './terrirtories'
import { utilsReducer, UtilsState } from './utils'
import { outletReducer, OutletState } from './outlets'
import { userReducer, UserState } from './users'
import { orderReducer, OrderState } from './orders'
import { invoiceReducer, InvoiceState } from './invoices'
import { deliveryReducer, DeliveryState } from './deliveries'
import { saleReducer, SaleState } from './sales'

export type ApplicationState = {
  auth: AuthState
  layout: LayoutState
  navbar: NavbarState
  manufacturers: ManufacturerState
  categories: CategoryState
  products: ProductState
  stock: StockState
  territories: TerritoryState
  utils: UtilsState
  outlets: OutletState
  users: UserState
  orders: OrderState
  invoices: InvoiceState
  deliveries: DeliveryState
  sales: SaleState
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'auth',
    'layout',
    'navbar',
    'manufacturers',
    'categories',
    'products',
    'stock',
    'territories',
    'utils',
    'outlets',
    'users',
    'orders',
    'invoices',
    'deliveries',
    'sales'
  ]
}

const appReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  navbar: navbarReducer,
  manufacturers: manufacturersReducer,
  categories: categoriesReducer,
  products: productsReducer,
  stock: stockReducer,
  territories: territoryReducer,
  utils: utilsReducer,
  outlets: outletReducer,
  users: userReducer,
  orders: orderReducer,
  invoices: invoiceReducer,
  deliveries: deliveryReducer,
  sales: saleReducer
})

const rootReducer = (state?: ApplicationState, action?: AnyAction) => {
  if (action && action.type === ActionTypes.DESTROY_STATES) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action!)
}

export const persistingReducer = () =>
  persistReducer(persistConfig, rootReducer)
