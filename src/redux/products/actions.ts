import { action } from 'typesafe-actions'
import {
  ProductObj,
  Product,
  ProductFields,
  Param,
  StockTrailObj
} from 'classes'
import { ActionTypes } from './types'

const productActions = {
  addProductRequest: (payload: ProductFields) =>
    action(ActionTypes.ADD_PRODUCT_REQUEST, payload),

  addProductSuccess: (data: Product) =>
    action(ActionTypes.ADD_PRODUCT_SUCCESS, data),

  addProductFailure: (error: any) =>
    action(ActionTypes.ADD_PRODUCT_FAILURE, error),

  updateProductRequest: (payload: ProductFields) =>
    action(ActionTypes.UPDATE_PRODUCT_REQUEST, payload),

  updateProductSuccess: (data: Product) =>
    action(ActionTypes.UPDATE_PRODUCT_SUCCESS, data),

  updateProductFailure: (error: any) =>
    action(ActionTypes.UPDATE_PRODUCT_FAILURE, error),

  deleteProductRequest: (id: string) =>
    action(ActionTypes.DELETE_PRODUCT_REQUEST, id),

  deleteProductSuccess: (id: string) =>
    action(ActionTypes.DELETE_PRODUCT_SUCCESS, id),

  deleteProductFailure: (error: any) =>
    action(ActionTypes.DELETE_PRODUCT_FAILURE, error),

  getProductsRequest: (params: Param) =>
    action(ActionTypes.GET_PRODUCTS_REQUEST, params),

  getProductsSuccess: (data: ProductObj) =>
    action(ActionTypes.GET_PRODUCTS_SUCCESS, data),

  getProductsFailure: (error: any) =>
    action(ActionTypes.GET_PRODUCTS_FAILURE, error),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  setSearchText: (value: string, products: Product[]) => {
    const res = products.filter((item) => {
      const blob = `${item.productName.toLowerCase()}`
      return blob.indexOf(value.replace(/ /gi, '').toLowerCase()) > -1
    })
    return action(ActionTypes.SEARCH_TEXT, { value, res })
  },

  reorderList: (list: Product[]) => action(ActionTypes.REORDER_LIST, list),

  setSortOrder: (order: 'asc' | 'desc' | 'normal') =>
    action(ActionTypes.SET_SORT_ORDER, order),

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setProduct: (product: Product) => action(ActionTypes.SET_PRODUCT, product),

  setQueryParams: (params: Param) =>
    action(ActionTypes.SET_QUERY_PARAMS, params),

  getStockTrailsRequest: (params: Param) =>
    action(ActionTypes.GET_STOCK_TRAILS_REQUEST, params),

  getStockTrailsSuccess: (data: StockTrailObj) =>
    action(ActionTypes.GET_STOCK_TRAILS_SUCCESS, data),

  getStockTrailsFailure: (error: any) =>
    action(ActionTypes.GET_STOCK_TRAILS_FAILURE, error),

  setStockTrailsParams: (params: Param) =>
    action(ActionTypes.SET_STOCK_TRIALS_PARAMS, params)
}

export default productActions
