import { Order, Param, Item } from '@classes/index'

export enum ActionTypes {
  SUBMITTING = '@@orders/SUBMITTING',
  GET_ORDERS_REQUEST = '@@orders/GET_ORDERS_REQUEST',
  GET_ORDERS_SUCCESS = '@@orders/GET_ORDERS_SUCCESS',
  GET_ORDERS_FAILURE = '@@orders/GET_ORDERS_FAILURE',
  ADD_ORDER_REQUEST = '@@orders/ADD_ORDER_REQUEST',
  ADD_ORDER_SUCCESS = '@@orders/ADD_ORDER_SUCCESS',
  ADD_ORDER_FAILURE = '@@orders/ADD_ORDER_FAILURE',
  UPDATE_ORDER_REQUEST = '@@orders/UPDATE_ORDER_REQUEST',
  UPDATE_ORDER_SUCCESS = '@@orders/UPDATE_ORDER_SUCCESS',
  UPDATE_ORDER_FAILURE = '@@orders/UPDATE_ORDER_FAILURE',
  DELETE_ORDER_REQUEST = '@@orders/DELETE_ORDER_REQUEST',
  DELETE_ORDER_SUCCESS = '@@orders/DELETE_ORDER_SUCCESS',
  DELETE_ORDER_FAILURE = '@@orders/DELETE_ORDER_FAILURE',
  EXPORT_ORDERS_REQUEST = '@@orders/EXPORT_ORDERS_REQUEST',
  EXPORT_ORDERS_SUCCESS = '@@orders/EXPORT_ORDERS_SUCCESS',
  EXPORT_ORDERS_FAILURE = '@@orders/EXPORT_ORDERS_FAILURE',
  CLEAR_STATES = '@@orders/CLEAR_STATES',
  SET_ACTIVE_LINK = '@@orders/SET_ACTIVE_LINK',
  SET_ORDER = '@@orders/SET_ORDER',
  SET_QUERY_PARAMS = '@@orders/SET_QUERY_PARAMS',
  ADD_TO_CART = '@@orders/ADD_TO_CART',
  REMOVE_FROM_CART = '@@orders/REMOVE_FROM_CART',
  CLEAR_CART = '@@orders/CLEAR_CART'
}

export type OrderState = {
  readonly isSubmitting: boolean
  readonly errors: any
  readonly orders: Order[]
  readonly loading: boolean
  readonly isExporting: boolean
  readonly isSucceeded: boolean
  readonly activeLink: string
  readonly isDeleted: boolean
  readonly order: Order | null
  readonly params: Param
  readonly count: number
  readonly cart: Item[]
}
