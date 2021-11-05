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

export enum ActionTypes {
  GET_ORDER_STAT_REQUEST = '@@home/GET_ORDER_STAT_REQUEST',
  GET_ORDER_STAT_SUCCESS = '@@home/GET_ORDER_STAT_SUCCESS',
  GET_ORDER_STAT_FAILURE = '@@home/GET_ORDER_STAT_FAILURE',
  SET_ACTIVE_LINK = '@@home/SET_ACTIVE_LINK',
  SET_QUERY_PARAMS = '@@home/SET_QUERY_PARAMS',
  GET_DELIVERY_STAT_REQUEST = '@@home/GET_DELIVERY_STAT_REQUEST',
  GET_DELIVERY_STAT_SUCCESS = '@@home/GET_DELIVERY_STAT_SUCCESS',
  GET_DELIVERY_STAT_FAILURE = '@@home/GET_DELIVERY_STAT_FAILURE',
  GET_SALE_STAT_REQUEST = '@@home/GET_SALE_STAT_REQUEST',
  GET_SALE_STAT_SUCCESS = '@@home/GET_SALE_STAT_SUCCESS',
  GET_SALE_STAT_FAILURE = '@@home/GET_SALE_STAT_FAILURE',
  GET_PAYMENT_STAT_REQUEST = '@@home/GET_PAYMENT_STAT_REQUEST',
  GET_PAYMENT_STAT_SUCCESS = '@@home/GET_PAYMENT_STAT_SUCCESS',
  GET_PAYMENT_STAT_FAILURE = '@@home/GET_PAYMENT_STAT_FAILURE',
  GET_PRODUCT_STAT_REQUEST = '@@home/GET_PRODUCT_STAT_REQUEST',
  GET_PRODUCT_STAT_SUCCESS = '@@home/GET_PRODUCT_STAT_SUCCESS',
  GET_PRODUCT_STAT_FAILURE = '@@home/GET_PRODUCT_STAT_FAILURE',
  GET_STOCK_STAT_REQUEST = '@@home/GET_STOCK_STAT_REQUEST',
  GET_STOCK_STAT_SUCCESS = '@@home/GET_STOCK_STAT_SUCCESS',
  GET_STOCK_STAT_FAILURE = '@@home/GET_STOCK_STAT_FAILURE',
  GET_INVOICE_STAT_REQUEST = '@@home/GET_INVOICE_STAT_REQUEST',
  GET_INVOICE_STAT_SUCCESS = '@@home/GET_INVOICE_STAT_SUCCESS',
  GET_INVOICE_STAT_FAILURE = '@@home/GET_INVOICE_STAT_FAILURE',
  GET_OUTLET_STAT_REQUEST = '@@home/GET_OUTLET_STAT_REQUEST',
  GET_OUTLET_STAT_SUCCESS = '@@home/GET_OUTLET_STAT_SUCCESS',
  GET_OUTLET_STAT_FAILURE = '@@home/GET_OUTLET_STAT_FAILURE',
  GET_MANU_STAT_REQUEST = '@@home/GET_MANU_STAT_REQUEST',
  GET_MANU_STAT_SUCCESS = '@@home/GET_MANU_STAT_SUCCESS',
  GET_MANU_STAT_FAILURE = '@@home/GET_MANU_STAT_FAILURE',
  GET_TERRITORY_STAT_REQUEST = '@@home/GET_TERRITORY_STAT_REQUEST',
  GET_TERRITORY_STAT_SUCCESS = '@@home/GET_TERRITORY_STAT_SUCCESS',
  GET_TERRITORY_STAT_FAILURE = '@@home/GET_TERRITORY_STAT_FAILURE'
}

export type HomeState = {
  readonly loading: boolean
  readonly activeLink: string
  readonly params: Param
  readonly orders: OrderStats[]
  readonly deliveries: DeliveryStats[]
  readonly sales: SaleStats[]
  readonly payments: PaymentStats[]
  readonly products: ProductStats[]
  readonly stock: StockStats[]
  readonly invoices: InvoiceStats[]
  readonly outlets: OutletStats[]
  readonly manufacturers: ManufacturerStats[]
  readonly territories: TerritoryStats[]
  readonly errors: any
}
