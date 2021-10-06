import { action } from 'typesafe-actions'
import { DeliveryObj, Delivery, Param, DeliveryFields } from 'classes'
import { ActionTypes } from './types'

const deliveryActions = {
  addDeliveryRequest: (payload: DeliveryFields) =>
    action(ActionTypes.ADD_DELIVERY_REQUEST, payload),

  addDeliverySuccess: () => action(ActionTypes.ADD_DELIVERY_SUCCESS),

  addDeliveryFailure: (error: any) =>
    action(ActionTypes.ADD_DELIVERY_FAILURE, error),

  updateDeliveryRequest: (payload: DeliveryFields) =>
    action(ActionTypes.UPDATE_DELIVERY_REQUEST, payload),

  updateDeliverySuccess: () => action(ActionTypes.UPDATE_DELIVERY_SUCCESS),

  updateDeliveryFailure: (error: any) =>
    action(ActionTypes.UPDATE_DELIVERY_FAILURE, error),

  deleteDeliveryRequest: (id: number) =>
    action(ActionTypes.DELETE_DELIVERY_REQUEST, id),

  deleteDeliverySuccess: (id: number) =>
    action(ActionTypes.DELETE_DELIVERY_SUCCESS, id),

  deleteDeliveryFailure: (error: any) =>
    action(ActionTypes.DELETE_DELIVERY_FAILURE, error),

  getDeliveriesRequest: (params: Param) =>
    action(ActionTypes.GET_DELIVERIES_REQUEST, params),

  getDeliveriesSuccess: (data: DeliveryObj) =>
    action(ActionTypes.GET_DELIVERIES_SUCCESS, data),

  getDeliveriesFailure: (error: any) =>
    action(ActionTypes.GET_DELIVERIES_FAILURE, error),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setDelivery: (delivery: Delivery) =>
    action(ActionTypes.SET_DELIVERY, delivery),

  setQueryParams: (params: Param) =>
    action(ActionTypes.SET_QUERY_PARAMS, params)
}

export default deliveryActions
