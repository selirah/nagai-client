import { action } from 'typesafe-actions'
import { StockObj, Stock, StockFields, Param, StockTrailObj } from 'classes'
import { ActionTypes } from './types'

const stockActions = {
  addStockRequest: (payload: StockFields) =>
    action(ActionTypes.ADD_STOCK_REQUEST, payload),

  addStockSuccess: () => action(ActionTypes.ADD_STOCK_SUCCESS),

  addStockFailure: (error: any) => action(ActionTypes.ADD_STOCK_FAILURE, error),

  updateStockRequest: (payload: StockFields) =>
    action(ActionTypes.UPDATE_STOCK_REQUEST, payload),

  updateStockSuccess: () => action(ActionTypes.UPDATE_STOCK_SUCCESS),

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

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setStock: (stock: Stock) => action(ActionTypes.SET_STOCK, stock),

  setQueryParams: (params: Param) =>
    action(ActionTypes.SET_QUERY_PARAMS, params),

  getStockTrailsRequest: (params: Param) =>
    action(ActionTypes.GET_STOCK_TRAILS_REQUEST, params),

  getStockTrailsSuccess: (data: StockTrailObj) =>
    action(ActionTypes.GET_STOCK_TRAILS_SUCCESS, data),

  getStockTrailsFailure: (error: any) =>
    action(ActionTypes.GET_STOCK_TRAILS_FAILURE, error),

  setStockTrailsParams: (params: Param) =>
    action(ActionTypes.SET_STOCK_TRIALS_PARAMS, params),

  getProductStockRequest: (productId: string) =>
    action(ActionTypes.GET_PRODUCT_STOCK_REQUEST, productId),

  getProductStockSuccess: (data: Stock[]) =>
    action(ActionTypes.GET_PRODUCT_STOCK_SUCCESS, data),

  getProductStockFailure: (error: any) =>
    action(ActionTypes.GET_PRODUCT_STOCK_FAILURE, error),

  clearProductStock: () => action(ActionTypes.CLEAR_PRODUCT_STOCK)
}

export default stockActions
