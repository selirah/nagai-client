import { Reducer } from 'redux'
import { OrderState, ActionTypes } from './types'

export const initialState: OrderState = {
  activeLink: 'list',
  count: 0,
  errors: null,
  isDeleted: false,
  isExporting: false,
  isSubmitting: false,
  isSucceeded: false,
  loading: false,
  order: null,
  orders: [],
  params: {
    page: 10,
    skip: 0,
    query: '',
    fromDate: '',
    toDate: '',
    status: ''
  }
}

const reducer: Reducer<OrderState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ORDER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.ADD_ORDER_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.ADD_ORDER_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_ORDER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.UPDATE_ORDER_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.DELETE_ORDER_REQUEST:
      return {
        ...state,
        errors: initialState.errors,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        orders: state.orders.filter((o) => o.id !== action.payload),
        isDeleted: true
      }

    case ActionTypes.DELETE_ORDER_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        orders: action.payload.orders,
        count: action.payload.count
      }

    case ActionTypes.GET_ORDERS_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.CLEAR_STATES:
      return {
        ...state,
        isSucceeded: initialState.isSucceeded,
        errors: initialState.errors,
        isDeleted: initialState.isDeleted,
        isSubmitting: initialState.isSubmitting,
        loading: initialState.loading
      }

    case ActionTypes.SET_ACTIVE_LINK:
      return {
        ...state,
        activeLink: action.payload
      }

    case ActionTypes.SET_ORDER:
      return {
        ...state,
        order: action.payload
      }

    case ActionTypes.SET_QUERY_PARAMS:
      return {
        ...state,
        params: action.payload
      }

    default:
      return state
  }
}

export { reducer as orderReducer }
