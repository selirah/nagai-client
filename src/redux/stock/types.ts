import { Stock, Param, StockTrail } from '@classes/index'

export enum ActionTypes {
  SUBMITTING = '@@stock/SUBMITTING',
  GET_STOCK_REQUEST = '@@stock/GET_STOCK_REQUEST',
  GET_STOCK_SUCCESS = '@@stock/GET_STOCK_SUCCESS',
  GET_STOCK_FAILURE = '@@stock/GET_STOCK_FAILURE',
  ADD_STOCK_REQUEST = '@@stock/ADD_STOCK_REQUEST',
  ADD_STOCK_SUCCESS = '@@stock/ADD_STOCK_SUCCESS',
  ADD_STOCK_FAILURE = '@@stock/ADD_STOCK_FAILURE',
  UPDATE_STOCK_REQUEST = '@@stock/UPDATE_STOCK_REQUEST',
  UPDATE_STOCK_SUCCESS = '@@stock/UPDATE_STOCK_SUCCESS',
  UPDATE_STOCK_FAILURE = '@@stock/UPDATE_STOCK_FAILURE',
  DELETE_STOCK_REQUEST = '@@stock/DELETE_STOCK_REQUEST',
  DELETE_STOCK_SUCCESS = '@@stock/DELETE_STOCK_SUCCESS',
  DELETE_STOCK_FAILURE = '@@stock/DELETE_STOCK_FAILURE',
  EXPORT_STOCK_REQUEST = '@@stock/EXPORT_STOCK_REQUEST',
  EXPORT_STOCK_SUCCESS = '@@stock/EXPORT_STOCK_SUCCESS',
  EXPORT_STOCK_FAILURE = '@@stock/EXPORT_STOCK_FAILURE',
  CLEAR_STATES = '@@stock/CLEAR_STATES',
  SET_ACTIVE_LINK = '@@stock/SET_ACTIVE_LINK',
  SET_STOCK = '@@stock/SET_STOCK',
  SET_QUERY_PARAMS = '@@stock/SET_QUERY_PARAMS',
  GET_STOCK_TRAILS_REQUEST = '@@stock/GET_STOCK_TRAILS_REQUEST',
  GET_STOCK_TRAILS_SUCCESS = '@@stock/GET_STOCK_TRAILS_SUCCESS',
  GET_STOCK_TRAILS_FAILURE = '@@stock/GET_STOCK_TRAILS_FAILURE',
  SET_STOCK_TRIALS_PARAMS = '@@stock/SET_STOCK_TRIALS_PARAMS',
  GET_PRODUCT_STOCK_REQUEST = '@@stock/GET_PRODUCT_STOCK_REQUEST',
  GET_PRODUCT_STOCK_SUCCESS = '@@stock/GET_PRODUCT_STOCK_SUCCESS',
  GET_PRODUCT_STOCK_FAILURE = '@@stock/GET_PRODUCT_STOCK_FAILURE',
  CLEAR_PRODUCT_STOCK = '@@stock/CLEAR_PRODUCT_STOCK'
}

export type StockState = {
  readonly isSubmitting: boolean
  readonly errors: any
  readonly stock: Stock[]
  readonly loading: boolean
  readonly isExporting: boolean
  readonly isSucceeded: boolean
  readonly activeLink: string
  readonly isDeleted: boolean
  readonly stk: Stock | null
  readonly params: Param
  readonly count: number
  readonly stockTrails: StockTrail[]
  readonly stockTrailsParams: Param
  readonly stockTrailsCount: number
  readonly loadStockTrails: boolean
  readonly productStock: Stock[]
}
