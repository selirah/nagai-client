import { action } from 'typesafe-actions'
import { Product } from 'classes'
import { ActionTypes } from './types'

const productActions = {
  addProductRequest: (payload: Product) =>
    action(ActionTypes.ADD_PRODUCT_REQUEST, payload),

  addProductSuccess: (data: Product) =>
    action(ActionTypes.ADD_PRODUCT_SUCCESS, data),

  addProductFailure: (error: any) =>
    action(ActionTypes.ADD_PRODUCT_FAILURE, error),

  updateProductRequest: (payload: Product) =>
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

  getProductsRequest: () => action(ActionTypes.GET_PRODUCTS_REQUEST),

  getProductsSuccess: (data: Product[]) =>
    action(ActionTypes.GET_PRODUCTS_SUCCESS, data),

  getProductsFailure: (error: any) =>
    action(ActionTypes.GET_PRODUCTS_FAILURE, error),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  setSearchText: (value: string) => action(ActionTypes.SEARCH_TEXT, value),

  setPageNumber: (page: number) => action(ActionTypes.SET_PAGE, page),

  reorderList: (list: Product[]) => action(ActionTypes.REORDER_LIST, list),

  setSortOrder: (order: 'asc' | 'desc' | 'normal') =>
    action(ActionTypes.SET_SORT_ORDER, order),

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setProduct: (product: Product) => action(ActionTypes.SET_PRODUCT, product)
}

export default productActions
