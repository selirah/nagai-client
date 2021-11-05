import { Outlet, Param, Order } from '@classes/index'

export enum ActionTypes {
  SUBMITTING = '@@outlets/SUBMITTING',
  GET_OUTLETS_REQUEST = '@@outlets/GET_OUTLETS_REQUEST',
  GET_OUTLETS_SUCCESS = '@@outlets/GET_OUTLETS_SUCCESS',
  GET_OUTLETS_FAILURE = '@@outlets/GET_OUTLETS_FAILURE',
  ADD_OUTLETS_REQUEST = '@@outlets/ADD_OUTLETS_REQUEST',
  ADD_OUTLETS_SUCCESS = '@@outlets/ADD_OUTLETS_SUCCESS',
  ADD_OUTLETS_FAILURE = '@@outlets/ADD_OUTLETS_FAILURE',
  UPDATE_OUTLETS_REQUEST = '@@outlets/UPDATE_OUTLETS_REQUEST',
  UPDATE_OUTLETS_SUCCESS = '@@outlets/UPDATE_OUTLETS_SUCCESS',
  UPDATE_OUTLETS_FAILURE = '@@outlets/UPDATE_OUTLETS_FAILURE',
  DELETE_OUTLETS_REQUEST = '@@outlets/DELETE_OUTLETS_REQUEST',
  DELETE_OUTLETS_SUCCESS = '@@outlets/DELETE_OUTLETS_SUCCESS',
  DELETE_OUTLETS_FAILURE = '@@outlets/DELETE_OUTLETS_FAILURE',
  EXPORT_OUTLETS_REQUEST = '@@outlets/EXPORT_OUTLETS_REQUEST',
  EXPORT_OUTLETS_SUCCESS = '@@outlets/EXPORT_OUTLETS_SUCCESS',
  EXPORT_OUTLETS_FAILURE = '@@outlets/EXPORT_OUTLETS_FAILURE',
  CLEAR_STATES = '@@outlets/CLEAR_STATES',
  SET_ACTIVE_LINK = '@@outlets/SET_ACTIVE_LINK',
  SET_OUTLET = '@@outlets/SET_OUTLET',
  SET_QUERY_PARAMS = '@@outlets/SET_QUERY_PARAMS',
  GET_ORDER_REQUEST = '@@outlets/GET_ORDER_REQUEST',
  GET_ORDER_SUCCESS = '@@outlets/GET_ORDER_SUCCESS',
  GET_ORDER_FAILURE = '@@outlets/GET_ORDER_FAILURE',
  SET_ORDER_PARAMS = '@@outlets/SET_ORDER_PARAMS'
}

export type OutletState = {
  readonly isSubmitting: boolean
  readonly errors: any
  readonly outlets: Outlet[]
  readonly loading: boolean
  readonly isExporting: boolean
  readonly isSucceeded: boolean
  readonly activeLink: string
  readonly isDeleted: boolean
  readonly outlet: Outlet | null
  readonly params: Param
  readonly count: number
  readonly orders: Order[]
  readonly orderParams: Param
  readonly orderCount: number
  readonly loadOrders: boolean
}
