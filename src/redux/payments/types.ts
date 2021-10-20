import { Payment, Param } from 'classes'

export enum ActionTypes {
  SUBMITTING = '@@payments/SUBMITTING',
  GET_PAYMENTS_REQUEST = '@@payments/GET_PAYMENTS_REQUEST',
  GET_PAYMENTS_SUCCESS = '@@payments/GET_PAYMENTS_SUCCESS',
  GET_PAYMENTS_FAILURE = '@@payments/GET_PAYMENTS_FAILURE',
  ADD_PAYMENT_REQUEST = '@@payments/ADD_PAYMENT_REQUEST',
  ADD_PAYMENT_SUCCESS = '@@payments/ADD_PAYMENT_SUCCESS',
  ADD_PAYMENT_FAILURE = '@@payments/ADD_PAYMENT_FAILURE',
  UPDATE_PAYMENT_REQUEST = '@@payments/UPDATE_PAYMENT_REQUEST',
  UPDATE_PAYMENT_SUCCESS = '@@payments/UPDATE_PAYMENT_SUCCESS',
  UPDATE_PAYMENT_FAILURE = '@@payments/UPDATE_PAYMENT_FAILURE',
  EXPORT_PAYMENT_REQUEST = '@@payments/EXPORT_PAYMENT_REQUEST',
  EXPORT_PAYMENT_SUCCESS = '@@payments/EXPORT_PAYMENT_SUCCESS',
  EXPORT_PAYMENT_FAILURE = '@@payments/EXPORT_PAYMENT_FAILURE',
  CLEAR_STATES = '@@payments/CLEAR_STATES',
  SET_ACTIVE_LINK = '@@payments/SET_ACTIVE_LINK',
  SET_PAYMENT = '@@payments/SET_PAYMENT',
  SET_QUERY_PARAMS = '@@payments/SET_QUERY_PARAMS'
}

export type PaymentState = {
  readonly isSubmitting: boolean
  readonly errors: any
  readonly payments: Payment[]
  readonly loading: boolean
  readonly isExporting: boolean
  readonly isSucceeded: boolean
  readonly activeLink: string
  readonly payment: Payment | null
  readonly params: Param
  readonly count: number
}
