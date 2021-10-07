import { Delivery, Param, Tracking } from 'classes'

export enum ActionTypes {
  SUBMITTING = '@@deliveries/SUBMITTING',
  GET_DELIVERIES_REQUEST = '@@deliveries/GET_DELIVERIES_REQUEST',
  GET_DELIVERIES_SUCCESS = '@@deliveries/GET_DELIVERIES_SUCCESS',
  GET_DELIVERIES_FAILURE = '@@deliveries/GET_DELIVERIES_FAILURE',
  ADD_DELIVERY_REQUEST = '@@deliveries/ADD_DELIVERY_REQUEST',
  ADD_DELIVERY_SUCCESS = '@@deliveries/ADD_DELIVERY_SUCCESS',
  ADD_DELIVERY_FAILURE = '@@deliveries/ADD_DELIVERY_FAILURE',
  UPDATE_DELIVERY_REQUEST = '@@deliveries/UPDATE_DELIVERY_REQUEST',
  UPDATE_DELIVERY_SUCCESS = '@@deliveries/UPDATE_DELIVERY_SUCCESS',
  UPDATE_DELIVERY_FAILURE = '@@deliveries/UPDATE_DELIVERY_FAILURE',
  DELETE_DELIVERY_REQUEST = '@@deliveries/DELETE_DELIVERY_REQUEST',
  DELETE_DELIVERY_SUCCESS = '@@deliveries/DELETE_DELIVERY_SUCCESS',
  DELETE_DELIVERY_FAILURE = '@@deliveries/DELETE_DELIVERY_FAILURE',
  EXPORT_DELIVERIES_REQUEST = '@@deliveries/EXPORT_DELIVERIES_REQUEST',
  EXPORT_DELIVERIES_SUCCESS = '@@deliveries/EXPORT_DELIVERIES_SUCCESS',
  EXPORT_DELIVERIES_FAILURE = '@@deliveries/EXPORT_DELIVERIES_FAILURE',
  CLEAR_STATES = '@@deliveries/CLEAR_STATES',
  SET_ACTIVE_LINK = '@@deliveries/SET_ACTIVE_LINK',
  SET_DELIVERY = '@@deliveries/SET_DELIVERY',
  SET_QUERY_PARAMS = '@@deliveries/SET_QUERY_PARAMS',
  GET_TRACKING_REQUEST = '@@deliveries/GET_TRACKING_REQUEST',
  GET_TRACKING_SUCCESS = '@@deliveries/GET_TRACKING_SUCCESS',
  GET_TRACKING_FAILURE = '@@deliveries/GET_TRACKING_FAILURE'
}

export type DeliveryState = {
  readonly isSubmitting: boolean
  readonly errors: any
  readonly deliveries: Delivery[]
  readonly loading: boolean
  readonly isExporting: boolean
  readonly isSucceeded: boolean
  readonly activeLink: string
  readonly isDeleted: boolean
  readonly delivery: Delivery | null
  readonly params: Param
  readonly count: number
  readonly tracking: Tracking | null
  readonly loadTracking: boolean
}
