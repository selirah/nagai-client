import { action } from 'typesafe-actions'
import { SaleObj, Sale, Param, SaleFields } from '@classes/index'
import { ActionTypes } from './types'

const saleActions = {
  addSaleRequest: (payload: SaleFields) =>
    action(ActionTypes.ADD_SALE_REQUEST, payload),

  addSalesuccess: () => action(ActionTypes.ADD_SALE_SUCCESS),

  addSaleFailure: (error: any) => action(ActionTypes.ADD_SALE_FAILURE, error),

  updateSaleRequest: (payload: SaleFields) =>
    action(ActionTypes.UPDATE_SALE_REQUEST, payload),

  updateSalesuccess: () => action(ActionTypes.UPDATE_SALE_SUCCESS),

  updateSaleFailure: (error: any) =>
    action(ActionTypes.UPDATE_SALE_FAILURE, error),

  getSalesRequest: (params: Param) =>
    action(ActionTypes.GET_SALES_REQUEST, params),

  getSalesSuccess: (data: SaleObj) =>
    action(ActionTypes.GET_SALES_SUCCESS, data),

  getSalesFailure: (error: any) => action(ActionTypes.GET_SALES_FAILURE, error),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setSale: (sale: Sale) => action(ActionTypes.SET_SALE, sale),

  setQueryParams: (params: Param) =>
    action(ActionTypes.SET_QUERY_PARAMS, params)
}

export default saleActions
