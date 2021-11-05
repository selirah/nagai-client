import { action } from 'typesafe-actions'
import { PaymentObj, Payment, Param, PaymentFields } from '@classes/index'
import { ActionTypes } from './types'

const paymentActions = {
  addPaymentRequest: (payload: PaymentFields) =>
    action(ActionTypes.ADD_PAYMENT_REQUEST, payload),

  addPaymentSuccess: () => action(ActionTypes.ADD_PAYMENT_SUCCESS),

  addPaymentFailure: (error: any) =>
    action(ActionTypes.ADD_PAYMENT_FAILURE, error),

  updatePaymentRequest: (payload: PaymentFields) =>
    action(ActionTypes.UPDATE_PAYMENT_REQUEST, payload),

  updatePaymentSuccess: () => action(ActionTypes.UPDATE_PAYMENT_SUCCESS),

  updatePaymentFailure: (error: any) =>
    action(ActionTypes.UPDATE_PAYMENT_FAILURE, error),

  getPaymentsRequest: (params: Param) =>
    action(ActionTypes.GET_PAYMENTS_REQUEST, params),

  getPaymentsSuccess: (data: PaymentObj) =>
    action(ActionTypes.GET_PAYMENTS_SUCCESS, data),

  getPaymentsFailure: (error: any) =>
    action(ActionTypes.GET_PAYMENTS_FAILURE, error),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setPayment: (payment: Payment) => action(ActionTypes.SET_PAYMENT, payment),

  setQueryParams: (params: Param) =>
    action(ActionTypes.SET_QUERY_PARAMS, params)
}

export default paymentActions
