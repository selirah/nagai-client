import { action } from 'typesafe-actions'
import { OrderObj, Order, OrderFields, Param, Item } from 'classes'
import { ActionTypes } from './types'

const orderActions = {
  addOrderRequest: (payload: OrderFields) =>
    action(ActionTypes.ADD_ORDER_REQUEST, payload),

  addOrderSuccess: () => action(ActionTypes.ADD_ORDER_SUCCESS),

  addOrderFailure: (error: any) => action(ActionTypes.ADD_ORDER_FAILURE, error),

  updateOrderRequest: (payload: OrderFields) =>
    action(ActionTypes.UPDATE_ORDER_REQUEST, payload),

  updateOrderSuccess: () => action(ActionTypes.UPDATE_ORDER_SUCCESS),

  updateOrderFailure: (error: any) =>
    action(ActionTypes.UPDATE_ORDER_FAILURE, error),

  deleteOrderRequest: (id: number) =>
    action(ActionTypes.DELETE_ORDER_REQUEST, id),

  deleteOrderSuccess: (id: number) =>
    action(ActionTypes.DELETE_ORDER_SUCCESS, id),

  deleteOrderFailure: (error: any) =>
    action(ActionTypes.DELETE_ORDER_FAILURE, error),

  getOrdersRequest: (params: Param) =>
    action(ActionTypes.GET_ORDERS_REQUEST, params),

  getOrdersSuccess: (data: OrderObj) =>
    action(ActionTypes.GET_ORDERS_SUCCESS, data),

  getOrdersFailure: (error: any) =>
    action(ActionTypes.GET_ORDERS_FAILURE, error),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setOrder: (order: Order) => action(ActionTypes.SET_ORDER, order),

  setQueryParams: (params: Param) =>
    action(ActionTypes.SET_QUERY_PARAMS, params),

  addToCart: (item: Item) => action(ActionTypes.ADD_TO_CART, item),

  removeFromCart: (id: number) => action(ActionTypes.REMOVE_FROM_CART, id),

  clearCart: () => action(ActionTypes.CLEAR_CART)
}

export default orderActions
