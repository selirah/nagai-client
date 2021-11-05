import { action } from 'typesafe-actions'
import {
  OrderStats,
  Param,
  DeliveryStats,
  SaleStats,
  PaymentStats,
  ProductStats,
  StockStats,
  InvoiceStats,
  OutletStats,
  ManufacturerStats,
  TerritoryStats
} from '@classes/index'
import { ActionTypes } from './types'

const homeActions = {
  getOrderStatRequest: (params: Param) =>
    action(ActionTypes.GET_ORDER_STAT_REQUEST, params),

  getOrderStatSuccess: (data: OrderStats[]) =>
    action(ActionTypes.GET_ORDER_STAT_SUCCESS, data),

  getOrderStatFailure: (error: any) =>
    action(ActionTypes.GET_ORDER_STAT_FAILURE, error),

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setQueryParams: (params: Param) =>
    action(ActionTypes.SET_QUERY_PARAMS, params),

  getDeliveryStatRequest: (params: Param) =>
    action(ActionTypes.GET_DELIVERY_STAT_REQUEST, params),

  getDeliveryStatSuccess: (data: DeliveryStats[]) =>
    action(ActionTypes.GET_DELIVERY_STAT_SUCCESS, data),

  getDeliveryStatFailure: (error: any) =>
    action(ActionTypes.GET_DELIVERY_STAT_FAILURE, error),

  getSaleStatRequest: (params: Param) =>
    action(ActionTypes.GET_SALE_STAT_REQUEST, params),

  getSaleStatSuccess: (data: SaleStats[]) =>
    action(ActionTypes.GET_SALE_STAT_SUCCESS, data),

  getSaleStatFailure: (error: any) =>
    action(ActionTypes.GET_SALE_STAT_FAILURE, error),

  getPaymentStatRequest: (params: Param) =>
    action(ActionTypes.GET_PAYMENT_STAT_REQUEST, params),

  getPaymentStatSuccess: (data: PaymentStats[]) =>
    action(ActionTypes.GET_PAYMENT_STAT_SUCCESS, data),

  getPaymentStatFailure: (error: any) =>
    action(ActionTypes.GET_PAYMENT_STAT_FAILURE, error),

  getProductStatRequest: (params: Param) =>
    action(ActionTypes.GET_PRODUCT_STAT_REQUEST, params),

  getProductStatSuccess: (data: ProductStats[]) =>
    action(ActionTypes.GET_PRODUCT_STAT_SUCCESS, data),

  getProductStatFailure: (error: any) =>
    action(ActionTypes.GET_PRODUCT_STAT_FAILURE, error),

  getStockStatRequest: (params: Param) =>
    action(ActionTypes.GET_STOCK_STAT_REQUEST, params),

  getStockStatSuccess: (data: StockStats[]) =>
    action(ActionTypes.GET_STOCK_STAT_SUCCESS, data),

  getStockStatFailure: (error: any) =>
    action(ActionTypes.GET_STOCK_STAT_FAILURE, error),

  getInvoiceStatRequest: (params: Param) =>
    action(ActionTypes.GET_INVOICE_STAT_REQUEST, params),

  getInvoiceStatSuccess: (data: InvoiceStats[]) =>
    action(ActionTypes.GET_INVOICE_STAT_SUCCESS, data),

  getInvoiceStatFailure: (error: any) =>
    action(ActionTypes.GET_INVOICE_STAT_FAILURE, error),

  getOutletStatRequest: (params: Param) =>
    action(ActionTypes.GET_OUTLET_STAT_REQUEST, params),

  getOutletStatSuccess: (data: OutletStats[]) =>
    action(ActionTypes.GET_OUTLET_STAT_SUCCESS, data),

  getOutletStatFailure: (error: any) =>
    action(ActionTypes.GET_OUTLET_STAT_FAILURE, error),

  getManuStatRequest: (params: Param) =>
    action(ActionTypes.GET_MANU_STAT_REQUEST, params),

  getManuStatSuccess: (data: ManufacturerStats[]) =>
    action(ActionTypes.GET_MANU_STAT_SUCCESS, data),

  getManuStatFailure: (error: any) =>
    action(ActionTypes.GET_MANU_STAT_FAILURE, error),

  getTerritoryStatRequest: (params: Param) =>
    action(ActionTypes.GET_TERRITORY_STAT_REQUEST, params),

  getTerritoryStatSuccess: (data: TerritoryStats[]) =>
    action(ActionTypes.GET_TERRITORY_STAT_SUCCESS, data),

  getTerritoryStatFailure: (error: any) =>
    action(ActionTypes.GET_TERRITORY_STAT_FAILURE, error)
}

export default homeActions
