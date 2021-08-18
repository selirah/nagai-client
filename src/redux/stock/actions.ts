import { action } from 'typesafe-actions'
import { StockObj, Stock, StockFields, Param, Unit } from 'classes'
import { ActionTypes } from './types'

const stockActions = {
  addStockRequest: (payload: StockFields) =>
    action(ActionTypes.ADD_STOCK_REQUEST, payload),

  addStockSuccess: (data: Stock) => action(ActionTypes.ADD_STOCK_SUCCESS, data),

  addStockFailure: (error: any) => action(ActionTypes.ADD_STOCK_FAILURE, error),

  updateStockRequest: (payload: StockFields) =>
    action(ActionTypes.UPDATE_STOCK_REQUEST, payload),

  updateStockSuccess: (data: Stock) =>
    action(ActionTypes.UPDATE_STOCK_SUCCESS, data),

  updateStockFailure: (error: any) =>
    action(ActionTypes.UPDATE_STOCK_FAILURE, error),

  deleteStockRequest: (id: string) =>
    action(ActionTypes.DELETE_STOCK_REQUEST, id),

  deleteStockSuccess: (id: string) =>
    action(ActionTypes.DELETE_STOCK_SUCCESS, id),

  deleteStockFailure: (error: any) =>
    action(ActionTypes.DELETE_STOCK_FAILURE, error),

  getStockRequest: (params: Param) =>
    action(ActionTypes.GET_STOCK_REQUEST, params),

  getStockSuccess: (data: StockObj) =>
    action(ActionTypes.GET_STOCK_SUCCESS, data),

  getStockFailure: (error: any) => action(ActionTypes.GET_STOCK_FAILURE, error),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  reorderList: (list: Stock[]) => action(ActionTypes.REORDER_LIST, list),

  setSortOrder: (order: 'asc' | 'desc' | 'normal') =>
    action(ActionTypes.SET_SORT_ORDER, order),

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setStock: (stock: Stock) => action(ActionTypes.SET_STOCK, stock),

  setQueryParams: (params: Param) =>
    action(ActionTypes.SET_QUERY_PARAMS, params),

  getUnitRequest: () => action(ActionTypes.GET_UNIT_REQUEST),

  getUnitSuccess: (data: Unit[]) => action(ActionTypes.GET_UNIT_SUCCESS, data),

  getUnitFailure: (error: any) => action(ActionTypes.GET_UNIT_FAILURE, error)
}

export default stockActions
